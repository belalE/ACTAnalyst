const Test = require("../models/test");
const Attempt = require("../models/attempt");

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
  res.render("attempts/index", { sortedAttempts, trendData });
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
  res.render("attempts/show", { attempt, raw, scaled });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findById(id).populate("test", "form");
  if (!attempt) {
    req.flash("error", "Cannot find that attempt!");
    return res.redirect("/attempts");
  }
  res.render("attempts/edit", { attempt });
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
