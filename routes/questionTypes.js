const express = require("express");
const router = express.Router();
const { QuestionType, topics } = require("../models/questionType");
const { catchAsync } = require("../utils/catchAsync");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const types = await QuestionType.find({});
    res.render("questionTypes/index", { types });
  })
);

router.get("/new", (req, res) => {
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
    res.render("questionTypes/show", { type });
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const questionType = new QuestionType(req.body.questionType);
    await questionType.save();
    res.redirect(`/types/${questionType._id}`);
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    var topicsArr = [
      ...topics.english,
      ...topics.math,
      ...topics.reading,
      ...topics.science,
    ];
    const { id } = req.params;
    const type = await QuestionType.findById(id).populate("questions");
    res.render("questionTypes/edit", { type, topicsArr, topics });
  })
);

router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const type = await QuestionType.findByIdAndUpdate(id, {
      ...req.body.questionType,
    });
    res.redirect(`/types/${type._id}`);
  })
);

router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const type = await QuestionType.findByIdAndDelete(id);
    res.redirect(`/types`);
  })
);

module.exports = router;
