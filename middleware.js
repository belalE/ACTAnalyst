const {
  testSchema,
  attemptSchema,
  questionTypeSchema,
} = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const Test = require("./models/test");
const Attempt = require("./models/attempt");
const QuestionType = require("./models/questionType");

module.exports.validateTest = (req, res, next) => {
  const { error } = testSchema.validate(req.body, { convert: true });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateAttempt = (req, res, next) => {
  const { error } = attemptSchema.validate(req.body, { convert: true });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateQuestionType = (req, res, next) => {
  const { error } = questionTypeSchema.validate(req.body, { convert: true });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};
