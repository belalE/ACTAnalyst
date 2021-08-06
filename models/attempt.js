const mongoose = require("mongoose");
const question = require("./question");
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

AttemptSchema.virtual("rawScores").get(async function () {
  const test = await Test.findById(this.test)
    .populate("questions.english")
    .populate("questions.math")
    .populate("questions.reading")
    .populate("questions.science");
  var english = 0;
  var math = 0;
  var reading = 0;
  var science = 0;
  for (let i = 0; i < 75; i++) {
    if (test.questions.english[i].answer == this.answers.english[i].choice) {
      english += 1;
    }
  }
  for (let i = 0; i < 60; i++) {
    if (test.questions.math[i].answer == this.answers.math[i].choice) {
      math += 1;
    }
  }
  for (let i = 0; i < 40; i++) {
    if (test.questions.reading[i].answer == this.answers.reading[i].choice) {
      reading += 1;
    }
  }
  for (let i = 0; i < 40; i++) {
    if (test.questions.science[i].answer == this.answers.science[i].choice) {
      science += 1;
    }
  }
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

module.exports = mongoose.model("Attempt", AttemptSchema);
