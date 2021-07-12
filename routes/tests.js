const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const Question = require("../models/question");
const { QuestionType, topics } = require("../models/questionType");

router.get("/", async (req, res) => {
  const tests = await Test.find({});
  res.render("tests/index", { tests });
});

router.get("/new", async (req, res) => {
  const types = await QuestionType.find({});
  console.log(types);
  res.render("tests/new", { topics, types });
});

router.post("/", async (req, res) => {
  const test = new Test(req.body.test);
  await test.save();
  res.redirect(`/tests/${test._id}`);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(id);
  res.render("tests/show", { test });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const test = await Test.findById(id);
  res.render("tests/edit", { test });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);
  const test = await Test.findByIdAndUpdate(id, req.body.test);
  res.redirect(`/tests/${test._id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Test.findByIdAndDelete(id);
  res.redirect("/tests");
});

module.exports = router;
