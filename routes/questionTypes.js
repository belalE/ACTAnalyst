const express = require("express");
const router = express.Router();
const { QuestionType, topics } = require("../models/questionType");

router.get("/new", (req, res) => {
  var topicsArr = [
    ...topics.english,
    ...topics.math,
    ...topics.reading,
    ...topics.science,
  ];
  res.render("questionTypes/new", { topics, topicsArr });
});
router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;
