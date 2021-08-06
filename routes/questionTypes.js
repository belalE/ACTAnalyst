const express = require("express");
const { validateQuestionType, isLoggedIn } = require("../middleware");
const router = express.Router();
const { QuestionType, topics } = require("../models/questionType");
const catchAsync = require("../utils/catchAsync");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const types = await QuestionType.find({});
    res.render("questionTypes/index", { types });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  var topicsArr = [
    ...topics.english,
    ...topics.math,
    ...topics.reading,
    ...topics.science,
  ];
  res.render("questionTypes/new", { topics, topicsArr });
});

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const type = await QuestionType.findById(id).populate("questions");
    if (!type) {
      req.flash("error", "Cannot find that type!");
      return res.redirect("/types");
    }
    res.render("questionTypes/show", { type });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateQuestionType,
  catchAsync(async (req, res) => {
    const questionType = new QuestionType(req.body.questionType);
    await questionType.save();
    req.flash("success", "Successfully added question type!");

    res.redirect(`/types/${questionType._id}`);
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
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
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateQuestionType,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const type = await QuestionType.findByIdAndUpdate(id, {
      ...req.body.questionType,
    });
    req.flash("success", "Successfully updated question type!");
    res.redirect(`/types/${type._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const type = await QuestionType.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted question type!");
    res.redirect(`/types`);
  })
);

module.exports = router;
