const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const Question = require("../models/question");
const { QuestionType, topics } = require("../models/questionType");
const catchAsync = require("../utils/catchAsync");
const { validateTest, isLoggedIn } = require("../middleware");
const tests = require("../controllers/tests");

router.get("/", tests.index);

router.get("/new", isLoggedIn, tests.renderNewForm);

router.post("/", isLoggedIn, validateTest, catchAsync(tests.createTest));

router.get("/:id", catchAsync(tests.showTest));

router.get("/:id/edit", isLoggedIn, catchAsync(tests.renderEditForm));

router.put("/:id", isLoggedIn, validateTest, catchAsync(tests.updateTest));

router.delete("/:id", isLoggedIn, catchAsync(tests.deleteTest));

module.exports = router;
