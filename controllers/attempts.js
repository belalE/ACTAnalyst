const Test = require("../models/test");
const Attempt = require("../models/attempt");

module.exports.index = async (req, res) => {
  const attempts = await Attempt.find({ owner: req.user._id }).populate(
    "test",
    "form"
  );
  res.render("attempts/index", { attempts });
};

module.exports.renderNewForm = async (req, res) => {
  const tests = await Test.find({});
  const selectedTest = req.query.test;
  res.render("attempts/new", { selectedTest, tests });
};

module.exports.createAttempt = async (req, res) => {
  const attempt = new Attempt(req.body.attempt);
  attempt.owner = req.user._id;
  await attempt.save();
  req.flash("success", "Successfully made a new attempt!");
  res.redirect(`/attempts/${attempt._id}`);
};

module.exports.showAttempt = async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findById(id).populate("test", "form");
  if (!attempt) {
    req.flash("error", "Cannot find that attempt!");
    return res.redirect("/attempts");
  }
  console.log(await attempt.scaledScores);

  res.render("attempts/show", { attempt });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findById(id).populate("test", "form");
  if (!attempt) {
    req.flash("error", "Cannot find that attempt!");
    return res.redirect("/attempts");
  }
  res.render("attempts/edit", { attempt });
};

module.exports.updateAttempt = async (req, res) => {
  const { id } = req.params;
  const attempt = await Attempt.findByIdAndUpdate(id, req.body.attempt);
  await attempt.save();
  req.flash("success", "Successfully updated attempt!");

  res.redirect(`/attempts/${attempt._id}`);
};

module.exports.deleteAttempt = async (req, res) => {
  const { id } = req.params;
  await Attempt.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted attempt!");
  res.redirect("/attempts");
};
