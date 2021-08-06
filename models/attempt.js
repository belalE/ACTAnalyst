const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttemptSchema = new Schema({
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
});

module.exports = mongoose.model("Attempt", AttemptSchema);
