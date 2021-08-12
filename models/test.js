const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { QuestionType, topics } = require("../models/questionType");

const ScaleSchema = new Schema({
  raw: Number,
  scaled: Number,
});

const TestSchema = new Schema({
  form: String,
  date: Date,
  questions: {
    english: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    math: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    reading: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    science: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  scales: {
    english: [
      {
        scaled: Number,
      },
    ],
    math: [
      {
        scaled: Number,
      },
    ],
    reading: [
      {
        scaled: Number,
      },
    ],
    science: [
      {
        scaled: Number,
      },
    ],
  },
});

function getTypeStats(questions) {
  var arr = [];
  console.log(questions[0]);
  for (let question of questions) {
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

TestSchema.virtual("typeStats").get(async function () {
  const english = getTypeStats(this.questions.english);
  const math = getTypeStats(this.questions.math);
  const reading = getTypeStats(this.questions.reading);
  const science = getTypeStats(this.questions.science);
  return { english, math, reading, science };
});

TestSchema.virtual("topicStats").get(async function () {
  // Get typeStats and populate with QuestionTypes
  const typeStats = await this.get("typeStats");
  // Make dictionary with variable for each general topic within each section
  var topicsDict = new Array(
    [...topics.english],
    [...topics.math],
    [...topics.reading],
    [...topics.science]
  );
  for (let i = 0; i < topicsDict.length; i++) {
    for (let j = 0; j < topicsDict[i].length; j++) {
      const topic = topicsDict[i][j];
      // Delete string version
      const index = topicsDict[i].indexOf(topic);
      topicsDict[i].splice(index, 1);
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
  console.log(topicsDict[0]["Punctuation"]);
  return topicsDict;
});

module.exports = mongoose.model("Test", TestSchema);
