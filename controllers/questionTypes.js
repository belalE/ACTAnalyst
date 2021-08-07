const { QuestionType, topics } = require("../models/questionType");
const Question = require("../models/question");
const Attempt = require("../models/attempt");
const test = require("../models/test");

async function getTestsTaken(id) {
  const attempts = await Attempt.find({ owner: id });
  const tests = [];
  for (attempt of attempts) {
    tests.push(attempt.test);
  }
  return tests;
}

module.exports.index = async (req, res) => {
  const types = await QuestionType.find({});
  res.render("questionTypes/index", { types, topics });
};

module.exports.renderNewForm = (req, res) => {
  var topicsArr = [
    ...topics.english,
    ...topics.math,
    ...topics.reading,
    ...topics.science,
  ];
  res.render("questionTypes/new", { topics, topicsArr });
};
module.exports.showQuestionType = async (req, res) => {
  const { id } = req.params;
  const type = await QuestionType.findById(id).populate("questions");
  const questions = await Question.find({ type: id }).populate("test", "form");
  var tests = [];
  if (req.user) {
    tests = await getTestsTaken(req.user._id);
  }
  if (!type) {
    req.flash("error", "Cannot find that type!");
    return res.redirect("/types");
  }
  res.render("questionTypes/show", { type, questions, tests });
};
module.exports.createQuestionType = async (req, res) => {
  const questionType = new QuestionType(req.body.questionType);
  await questionType.save();
  req.flash("success", "Successfully added question type!");

  res.redirect(`/types/${questionType._id}`);
};
module.exports.renderEditForm = async (req, res) => {
  var topicsArr = [
    ...topics.english,
    ...topics.math,
    ...topics.reading,
    ...topics.science,
  ];
  const { id } = req.params;
  const type = await QuestionType.findById(id).populate("questions");
  if (!type) {
    req.flash("error", "Cannot find that type!");
    return res.redirect("/types");
  }
  res.render("questionTypes/edit", { type, topicsArr, topics });
};
module.exports.updateQuestionType = async (req, res) => {
  const { id } = req.params;
  const type = await QuestionType.findByIdAndUpdate(id, {
    ...req.body.questionType,
  });
  req.flash("success", "Successfully updated question type!");
  res.redirect(`/types/${type._id}`);
};
module.exports.deleteQuestionType = async (req, res) => {
  const { id } = req.params;
  const type = await QuestionType.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted question type!");
  res.redirect(`/types`);
};
