const mongoose = require("mongoose");
require("mongoose-type-url");
const Schema = mongoose.Schema;

const englishTopics = [
  "Punctuation",
  "Usage",
  "Organization, Unity, & Cohesion",
  "Knowledge of Language",
];
const mathTopics = [
  "Gaps, Skills, and Knowledge",
  "Algebra",
  "Geometry",
  "Other",
];
const readingTopics = [
  "Line & No Line",
  "Purpose",
  "Main Idea",
  "Word/Ohrase in Context",
  "Synthesis",
];
const scienceTopics = ["Detail", "Compare", "Purpose", "Inference"]; // Might be changed

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
    enum: [...englishTopics, ...mathTopics, ...readingTopics, ...scienceTopics],
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
