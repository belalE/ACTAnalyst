const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;

const QuestionTypeSchema = new Schema({
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  name: String,
  general: {
    type: String,
    enum: ["Algebra", "Geometry", ""],
  },
  section: {
    type: String,
    enum: ["English", "Math", "Reading", "Science"],
  },
  resources: [
    {
      link: Schema.Types.Url,
      name: String,
      description: String,
      format: {
        type: String,
        enum: ["Video", "Article", "Text", "Formula"],
      },
    },
  ],
});

module.exports = mongoose.model("QuestionType", QuestionTypeSchema);
