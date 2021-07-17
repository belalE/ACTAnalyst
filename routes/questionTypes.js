const express = require("express");
const router = express.Router();
const { QuestionType, topics } = require("../models/questionType");

router.get("/", async (req, res) => {
  const types = await QuestionType.find({});
  res.render("questionTypes/index", { types });
});

router.get("/new", (req, res) => {
  var topicsArr = [
    ...topics.english,
    ...topics.math,
    ...topics.reading,
    ...topics.science,
  ];
  res.render("questionTypes/new", { topics, topicsArr });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const type = await QuestionType.findById(id).populate("questions");
  res.render("questionTypes/show", { type });
});

router.post("/", async (req, res) => {
  const questionType = new QuestionType(req.body.questionType);
  await questionType.save();
  res.redirect(`/types/${questionType._id}`);
});

router.get("/:id/edit", async (req, res) => {
  var topicsArr = [
    ...topics.english,
    ...topics.math,
    ...topics.reading,
    ...topics.science,
  ];
  const { id } = req.params;
  const type = await QuestionType.findById(id).populate("questions");
  res.render("questionTypes/edit", { type, topicsArr, topics });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const type = await QuestionType.findByIdAndUpdate(id, {
    ...req.body.questionType,
  });
  res.redirect(`/types/${type._id}`);
});

module.exports = router;
