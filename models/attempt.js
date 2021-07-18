const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttemptSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  dateTaken: Date,
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
            enum: ["Skip", "NoTime", "Guess", "Revised"],
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
            enum: ["Skip", "NoTime", "Guess", "Revised"],
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
            enum: ["Skip", "NoTime", "Guess", "Revised"],
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
            enum: ["Skip", "NoTime", "Guess", "Revised"],
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("Attempt", AttemptSchema);
