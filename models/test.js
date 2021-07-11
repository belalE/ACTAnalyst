const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    english: [ScaleSchema],
    math: [ScaleSchema],
    reading: [ScaleSchema],
    science: [ScaleSchema],
  },
});

module.exports = mongoose.model("Test", TestSchema);
