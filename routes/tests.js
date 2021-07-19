const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const Question = require("../models/question");
const { QuestionType, topics } = require("../models/questionType");
const catchAsync = require("../utils/catchAsync");
const { validateTest } = require("../middleware");

router.get("/", async (req, res) => {
  const tests = await Test.find({});
  res.render("tests/index", { tests });
});

router.get("/new", async (req, res) => {
  const types = await QuestionType.find({});
  res.render("tests/new", { topics, types });
});

router.post(
  "/",
  validateTest,
  catchAsync(async (req, res, next) => {
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
    res.redirect(`/tests/${test._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const test = await Test.findById(id);
    res.render("tests/show", { test });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const test = await Test.findById(id)
      .populate("questions.english")
      .populate("questions.math")
      .populate("questions.reading")
      .populate("questions.science");
    const types = await QuestionType.find({});
    res.render("tests/edit", { test, topics, types });
  })
);

router.put(
  "/:id",
  validateTest,
  catchAsync(async (req, res) => {
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
    res.redirect(`/tests/${test._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Test.findByIdAndDelete(id);
    res.redirect("/tests");
  })
);

module.exports = router;
