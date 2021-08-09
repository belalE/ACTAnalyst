const mongoose = require("mongoose");
const question = require("./question");
const { QuestionType, topics } = require("./questionType");
const Schema = mongoose.Schema;
const Test = require("./test");

const AttemptSchema = new Schema(
  {
    test: {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
    dateTaken: Date,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    answers: {
      english: [
        {
          choice: {
            type: String,
            enum: ["A", "B", "C", "D", "E"],
          },
          tags: [
            {
              type: String,
              enum: ["skip", "noTime", "guess", "revised"],
            },
          ],
        },
      ],
      math: [
        {
          choice: {
            type: String,
            enum: ["A", "B", "C", "D", "E"],
          },
          tags: [
            {
              type: String,
              enum: ["skip", "noTime", "guess", "revised"],
            },
          ],
        },
      ],
      reading: [
        {
          choice: {
            type: String,
            enum: ["A", "B", "C", "D", "E"],
          },
          tags: [
            {
              type: String,
              enum: ["skip", "noTime", "guess", "revised"],
            },
          ],
        },
      ],
      science: [
        {
          choice: {
            type: String,
            enum: ["A", "B", "C", "D", "E"],
          },
          tags: [
            {
              type: String,
              enum: ["skip", "noTime", "guess", "revised"],
            },
          ],
        },
      ],
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

AttemptSchema.virtual("mistakes").get(async function () {
  const test = await Test.findById(this.test)
    .populate("questions.english")
    .populate("questions.math")
    .populate("questions.reading")
    .populate("questions.science");
  var english = [];
  var math = [];
  var reading = [];
  var science = [];

  for (let i = 0; i < 75; i++) {
    if (test.questions.english[i].answer != this.answers.english[i].choice) {
      english.push(test.questions.english[i]);
    }
  }
  for (let i = 0; i < 60; i++) {
    if (test.questions.math[i].answer != this.answers.math[i].choice) {
      math.push(test.questions.math[i]);
    }
  }
  for (let i = 0; i < 40; i++) {
    if (test.questions.reading[i].answer != this.answers.reading[i].choice) {
      reading.push(test.questions.reading[i]);
    }
  }
  for (let i = 0; i < 40; i++) {
    if (test.questions.science[i].answer != this.answers.science[i].choice) {
      science.push(test.questions.science[i]);
    }
  }
  return { english, math, reading, science };
});

AttemptSchema.virtual("rawScores").get(async function () {
  const mistakes = await this.get("mistakes");
  var english = 75 - mistakes.english.length;
  var math = 60 - mistakes.math.length;
  var reading = 40 - mistakes.reading.length;
  var science = 40 - mistakes.science.length;
  const scoreDict = { english, math, reading, science };
  return scoreDict;
});

AttemptSchema.virtual("scaledScores").get(async function () {
  const scores = await this.get("rawScores");
  const test = await Test.findById(this.test);

  const english = test.scales.english[scores.english - 1].scaled;
  const math = test.scales.math[scores.math - 1].scaled;
  const reading = test.scales.reading[scores.reading - 1].scaled;
  const science = test.scales.science[scores.science - 1].scaled;

  return { english, math, reading, science };
});

function getStats(arr) {
  var skips = 0;
  var guesses = 0;
  var times = 0;
  var revises = 0;
  for (let question of arr) {
    if (question.tags.includes("skip")) {
      skips++;
    }
    if (question.tags.includes("guess")) {
      guesses++;
    }
    if (question.tags.includes("noTime")) {
      times++;
    }
    if (question.tags.includes("revised")) {
      revises++;
    }
  }
  stats = { skips, guesses, times, revises };
  return stats;
}

AttemptSchema.virtual("tagStats").get(function () {
  englishStats = getStats(this.answers.english);
  mathStats = getStats(this.answers.math);
  readingStats = getStats(this.answers.reading);
  scienceStats = getStats(this.answers.science);
  return { englishStats, mathStats, readingStats, scienceStats };
});

function getTypeStats(mistakeArr) {
  var arr = [];
  for (let question of mistakeArr) {
    if (question.type) {
      if (arr[question.type]) {
        arr[question.type] += 1;
      } else {
        arr[question.type] = 1;
      }
    }
  }
  // Convert to object (https://stackoverflow.com/questions/7259728/json-stringify-returning)
  arr = Object.assign({}, arr);
  return arr;
}

AttemptSchema.virtual("typeStats").get(async function () {
  const mistakes = await this.get("mistakes");
  const english = getTypeStats(mistakes.english);
  const math = getTypeStats(mistakes.math);
  const reading = getTypeStats(mistakes.reading);
  const science = getTypeStats(mistakes.science);
  return { english, math, reading, science };
});

AttemptSchema.virtual("topicStats").get(async function () {
  // Get typeStats and populate with QuestionTypes
  const typeStats = await this.get("typeStats");
  console.log(typeStats);
  // Make dictionary with variable for each general topic within each section
  var topicsDict = new Array(
    topics.english,
    topics.math,
    topics.reading,
    topics.science
  );
  for (let i = 0; i < topicsDict.length; i++) {
    for (let j = 0; j < topicsDict[i].length; j++) {
      const topic = topicsDict[i][j];
      // Delete string version
      const index = topicsDict[i].indexOf(topic);
      console.log(topicsDict[i].splice(index, 1));
      topicsDict[i][topic] = new Array();
      j--;
    }
  }
  // Loop through all question types from typeStats
  for (let i = 0; i < 4; i++) {
    const section = ["english", "math", "reading", "science"][i];
    const keys = Object.keys(typeStats[section]);
    for (let j = 0; j < keys.length; j++) {
      // Increment the general topic based on QuestionType.general
      const value = typeStats[section][keys[j]];
      const questionType = await QuestionType.findById(keys[j]);
      if (
        topicsDict[i][questionType.general].findIndex((t) =>
          t.questionType._id.equals(questionType._id)
        ) === -1
      ) {
        topicsDict[i][questionType.general].push({ questionType, value });
      }
      // Convert to object
      topicsDict[i] = Object.assign({}, topicsDict[i]);
    }
  }
  // Change it from

  // Return dictionary

  console.log("out: ");
  return topicsDict;
});

module.exports = mongoose.model("Attempt", AttemptSchema);
