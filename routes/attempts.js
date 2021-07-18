const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const Attempt = require("../models/attempt");
const { catchAsync } = require("../utils/catchAsync");

router.get("/", async (req, res) => {
  const attempts = await Attempt.find({}).populate("test", "form");
  res.render("attempts/index", { attempts });
});

router.get("/new", async (req, res) => {
  const tests = await Test.find({});
  const selectedTest = req.query.test;
  res.render("attempts/new", { selectedTest, tests });
});

router.post("/", async (req, res) => {
  const attempt = new Attempt(req.body.attempt);
  await attempt.save();
  res.redirect(`/attempts/${attempt._id}`);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findById(id).populate("test", "form");
  res.render("attempts/show", { attempt });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findById(id).populate("test", "form");
  res.render("attempts/edit", { attempt });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findByIdAndUpdate(id, req.body.attempt);
  await attempt.save();
  res.redirect(`/attempts/${attempt._id}`);
});

module.exports = router;
