const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  index: Number,
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  answer: {
    type: String,
    enum: ["A", "B", "C", "D", "E"],
  },
  explanation: String,
  type: {
    type: Schema.Types.ObjectId,
    ref: "QuestionType",
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
