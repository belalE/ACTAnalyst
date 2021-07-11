const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttemptSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  dateTaken: Date,
  answers: [
    {
      index: Number,
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
});

module.exports = mongoose.model("Attempt", AttemptSchema);
