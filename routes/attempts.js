const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const Attempt = require("../models/attempt");
const catchAsync = require("../utils/catchAsync");
const { validateAttempt } = require("../middleware");
const { isLoggedIn } = require("../middleware");

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const attempts = await Attempt.find({}).populate("test", "form");
    res.render("attempts/index", { attempts });
  })
);

router.get(
  "/new",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const tests = await Test.find({});
    const selectedTest = req.query.test;
    res.render("attempts/new", { selectedTest, tests });
  })
);

router.post(
  "/",
  isLoggedIn,
  validateAttempt,
  catchAsync(async (req, res) => {
    const attempt = new Attempt(req.body.attempt);
    await attempt.save();
    req.flash("success", "Successfully made a new attempt!");
    res.redirect(`/attempts/${attempt._id}`);
  })
);

router.get(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const attempt = await Attempt.findById(id).populate("test", "form");
    if (!attempt) {
      req.flash("error", "Cannot find that attempt!");
      return res.redirect("/attempts");
    }
    res.render("attempts/show", { attempt });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const attempt = await Attempt.findById(id).populate("test", "form");
    if (!attempt) {
      req.flash("error", "Cannot find that attempt!");
      return res.redirect("/attempts");
    }
    res.render("attempts/edit", { attempt });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateAttempt,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const attempt = await Attempt.findByIdAndUpdate(id, req.body.attempt);
    await attempt.save();
    req.flash("success", "Successfully updated attempt!");

    res.redirect(`/attempts/${attempt._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Attempt.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted attempt!");
    res.redirect("/attempts");
  })
);

module.exports = router;
