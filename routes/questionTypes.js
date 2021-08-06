const express = require("express");
const { validateQuestionType, isLoggedIn } = require("../middleware");
const router = express.Router();
const { QuestionType, topics } = require("../models/questionType");
const catchAsync = require("../utils/catchAsync");
const questionTypes = require("../controllers/questionTypes");

router.get("/", catchAsync(questionTypes.index));

router.get("/new", isLoggedIn, questionTypes.renderNewForm);

router.get("/:id", catchAsync(questionTypes.showQuestionType));

router.post(
  "/",
  isLoggedIn,
  validateQuestionType,
  catchAsync(questionTypes.createQuestionType)
);

router.get("/:id/edit", isLoggedIn, catchAsync(questionTypes.renderEditForm));

router.put(
  "/:id",
  isLoggedIn,
  validateQuestionType,
  catchAsync(questionTypes.updateQuestionType)
);

router.delete("/:id", isLoggedIn, catchAsync(questionTypes.deleteQuestionType));

module.exports = router;
