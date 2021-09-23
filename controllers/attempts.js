const Test = require("../models/test");
const Attempt = require("../models/attempt");
const { QuestionType } = require("../models/questionType");

async function getScoreTrends(attempts) {
  var dateArr = [];
  var englishArr = [];
  var mathArr = [];
  var readingArr = [];
  var scienceArr = [];
  for (attempt of attempts) {
    dateArr.push(attempt.dateTaken.toISOString().slice(0, 10));
    const scaledScores = await attempt.get("scaledScores");
    englishArr.push(scaledScores.english);
    mathArr.push(scaledScores.math);
    readingArr.push(scaledScores.reading);
    scienceArr.push(scaledScores.science);
  }
  return { dateArr, englishArr, mathArr, readingArr, scienceArr };
}
async function getMistakeTrends(attempts) {
  var dateArr = [];
  var englishArr = [];
  var mathArr = [];
  var readingArr = [];
  var scienceArr = [];
  for (attempt of attempts) {
    dateArr.push(attempt.dateTaken.toISOString().slice(0, 10));
    const rawScores = await attempt.get("rawScores");
    englishArr.push(75 - rawScores.english);
    mathArr.push(60 - rawScores.math);
    readingArr.push(40 - rawScores.reading);
    scienceArr.push(40 - rawScores.science);
  }
  return { dateArr, englishArr, mathArr, readingArr, scienceArr };
}

async function sumTopicStats(attempts) {
  // create empty dict for the stats
  var dict = Object.create({});
  // get topicStats for each attempt
  const statsArr = new Array();
  for (let attempt of attempts) {
    const stat = await attempt.get("topicStats");
    statsArr.push({ ...stat });
  }
  // loop through each attempt
  for (let stats of statsArr) {
    // loop through each section
    for (let section of [0, 1, 2, 3]) {
      // if section is not in index, add it
      if (!dict[section]) {
        dict[section] = Object.create({});
      }
      // loop through topics in each section
      for (let topicKey of Object.keys(stats[section])) {
        // if topic not in index, add it
        if (!dict[section][topicKey]) {
          dict[section][topicKey] = new Array();
        }
        // loop through types in each topic
        for (let type of stats[section][topicKey]) {
          // if type not in index, add it
          // else, increment its value
          if (
            dict[section][topicKey].findIndex((t) =>
              t.questionType._id.equals(type.questionType._id)
            ) === -1
          ) {
            dict[section][topicKey].push({ ...type });
          } else {
            const index = dict[section][topicKey].findIndex((t) =>
              t.questionType._id.equals(type.questionType._id)
            );
            dict[section][topicKey][index].value += type.value;
          }
        }
      }
    }
  }
  return dict;
}

function getWorst(stats, section) {
  if (stats[section] != null) {
    var arr = [];
    const data = stats[section];
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const types = data[key];
      // Add general topic to data arr
      var num = 0;

      for (let type of types) {
        num += type.value;
      }
      arr.push({
        name: key,
        y: num,
        drilldown: key,
      });
    }
    // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
    const max = arr.reduce(function (prev, current) {
      return prev.y > current.y ? prev : current;
    });

    return max.name;
  }
  return "Add more data";
}

async function getTagsData(attempts) {
  var dates = [];
  var engSkips = [];
  var engGuesses = [];
  var engTimes = [];
  var engRevises = [];
  var mathSkips = [];
  var mathGuesses = [];
  var mathTimes = [];
  var mathRevises = [];
  var readSkips = [];
  var readGuesses = [];
  var readTimes = [];
  var readRevises = [];
  var sciSkips = [];
  var sciGuesses = [];
  var sciTimes = [];
  var sciRevises = [];
  for (attempt of attempts) {
    dates.push(attempt.dateTaken.toISOString().slice(0, 10));
    const stats = await attempt.get("tagStats");
    engSkips.push(stats.englishStats.skips);
    engGuesses.push(stats.englishStats.guesses);
    engTimes.push(stats.englishStats.times);
    engRevises.push(stats.englishStats.revises);

    mathSkips.push(stats.mathStats.skips);
    mathGuesses.push(stats.mathStats.guesses);
    mathTimes.push(stats.mathStats.times);
    mathRevises.push(stats.mathStats.revises);

    readSkips.push(stats.readingStats.skips);
    readGuesses.push(stats.readingStats.guesses);
    readTimes.push(stats.readingStats.times);
    readRevises.push(stats.readingStats.revises);

    sciSkips.push(stats.scienceStats.skips);
    sciGuesses.push(stats.scienceStats.guesses);
    sciTimes.push(stats.scienceStats.times);
    sciRevises.push(stats.scienceStats.revises);
  }
  const english = {
    skips: engSkips,
    guesses: engGuesses,
    times: engTimes,
    revises: engRevises,
  };
  const math = {
    skips: mathSkips,
    guesses: mathGuesses,
    times: mathTimes,
    revises: mathRevises,
  };
  const reading = {
    skips: readSkips,
    guesses: readGuesses,
    times: readTimes,
    revises: readRevises,
  };
  const science = {
    skips: sciSkips,
    guesses: sciGuesses,
    times: sciTimes,
    revises: sciRevises,
  };
  const stats = {
    dates,
    english,
    math,
    reading,
    science,
  };
  return stats;
}

function getMistakesIndices(mistakes) {
  const dict = {};
  for (let section of ["english", "math", "reading", "science"]) {
    for (let mistake of mistakes[section]) {
      if (!dict[section]) {
        dict[section] = [mistake.index];
      } else {
        dict[section].push(mistake.index);
      }
    }
  }
  return dict;
}

module.exports.index = async (req, res) => {
  const attempts = await Attempt.find({ owner: req.user._id }).populate(
    "test",
    "form"
  );
  // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
  sortedAttempts = attempts.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.dateTaken) - new Date(a.dateTaken);
  });
  const trendData = await getScoreTrends(sortedAttempts.slice().reverse());
  const mistakeData = await getMistakeTrends(sortedAttempts.slice().reverse());
  const summedQTypes = await sumTopicStats(sortedAttempts);
  const worstDict = {
    english: getWorst(summedQTypes, 0),
    math: getWorst(summedQTypes, 1),
    reading: getWorst(summedQTypes, 2),
    science: getWorst(summedQTypes, 3),
  };
  const tagsData = await getTagsData(sortedAttempts.slice().reverse());
  res.render("attempts/index", {
    sortedAttempts,
    trendData,
    mistakeData,
    summedQTypes,
    worstDict,
    tagsData,
  });
};

module.exports.renderNewForm = async (req, res) => {
  const tests = await Test.find({});
  const selectedTest = req.query.test;
  res.render("attempts/new", { selectedTest, tests });
};

module.exports.createAttempt = async (req, res) => {
  const attempt = new Attempt(req.body.attempt);
  attempt.owner = req.user._id;
  await attempt.save();
  req.flash("success", "Successfully made a new attempt!");
  res.redirect(`/attempts/${attempt._id}`);
};

module.exports.showAttempt = async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findById(id).populate("test", "form");
  if (!attempt) {
    req.flash("error", "Cannot find that attempt!");
    return res.redirect("/attempts");
  }
  raw = await attempt.rawScores;
  scaled = await attempt.scaledScores;
  const topicStats = await attempt.topicStats;
  const mistakes = await attempt.mistakes;
  res.render("attempts/show", {
    attempt,
    raw,
    scaled,
    topicStats,
    mistakes,
  });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findById(id).populate("test", "form");
  if (!attempt) {
    req.flash("error", "Cannot find that attempt!");
    return res.redirect("/attempts");
  }
  const mistakes = await attempt.mistakes;
  const mistakeIndices = getMistakesIndices(mistakes);
  res.render("attempts/edit", { attempt, mistakeIndices });
};

module.exports.updateAttempt = async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findByIdAndUpdate(id, req.body.attempt);
  await attempt.save();
  req.flash("success", "Successfully updated attempt!");

  res.redirect(`/attempts/${attempt._id}`);
};

module.exports.deleteAttempt = async (req, res) => {
  const { id } = req.params;
  await Attempt.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted attempt!");
  res.redirect("/attempts");
};
