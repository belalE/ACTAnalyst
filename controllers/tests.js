const Test = require("../models/test");
const Question = require("../models/question");

module.exports.index = async (req, res) => {
  const tests = await Test.find({});
  res.render("tests/index", { tests });
};

module.exports.renderNewForm = async (req, res) => {
  const types = await QuestionType.find({});
  res.render("tests/new", { topics, types });
};

module.exports.createTest = async (req, res, next) => {
  const test = new Test(req.body.test);
  for (section in req.body.questions) {
    for (
      let i = 1;
      i < Object.keys(req.body.questions[section]).length + 1;
      i++
    ) {
      const question = new Question({
        test: test._id,
        index: i,
        answer: req.body.questions[section][i.toString() - 1].answer,
        type: req.body.questions[section][i.toString() - 1].type,
      });
      await question.save();
      test.questions[section].push(question);
    }
  }
  await test.save();
  req.flash("success", "Successfully added test!");
  res.redirect(`/tests/${test._id}`);
};

module.exports.showTest = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(id);
  if (!test) {
    req.flash("error", "Cannot find that type!");
    return res.redirect("/tests");
  }
  res.render("tests/show", { test });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(id)
    .populate("questions.english")
    .populate("questions.math")
    .populate("questions.reading")
    .populate("questions.science");
  if (!test) {
    req.flash("error", "Cannot find that test!");
    return res.redirect("/tests");
  }
  const types = await QuestionType.find({});
  res.render("tests/edit", { test, topics, types });
};

module.exports.updateTest = async (req, res) => {
  const { id } = req.params;
  const test = await Test.findByIdAndUpdate(id, req.body.test);
  for (section in req.body.questions) {
    for (
      let i = 1;
      i < Object.keys(req.body.questions[section]).length + 1;
      i++
    ) {
      const question = await Question.findByIdAndUpdate(
        test.questions[section][i - 1],
        {
          answer: req.body.questions[section][i.toString() - 1].answer,
          type: req.body.questions[section][i.toString() - 1].type,
        }
      );
      await question.save();
    }
  }
  await test.save();
  req.flash("success", "Successfully updated test!");
  res.redirect(`/tests/${test._id}`);
};

module.exports.deleteTest = async (req, res) => {
  const { id } = req.params;
  await Test.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted test!");
  res.redirect("/tests");
};
