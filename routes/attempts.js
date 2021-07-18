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

router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;
