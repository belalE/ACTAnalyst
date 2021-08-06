const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const Attempt = require("../models/attempt");
const catchAsync = require("../utils/catchAsync");
const { validateAttempt, isLoggedIn, isOwner } = require("../middleware");
const attempts = require("../controllers/attempts");
router.get("/", isLoggedIn, catchAsync(attempts.index));

router.get("/new", isLoggedIn, catchAsync(attempts.renderNewForm));

router.post(
  "/",
  isLoggedIn,
  validateAttempt,
  catchAsync(attempts.createAttempt)
);

router.get("/:id", isLoggedIn, isOwner, catchAsync(attempts.showAttempt));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  catchAsync(attempts.renderEditForm)
);

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateAttempt,
  catchAsync(attempts.updateAttempt)
);

router.delete("/:id", isLoggedIn, isOwner, catchAsync(attempts.deleteAttempt));

module.exports = router;
