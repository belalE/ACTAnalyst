const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Test = require("./models/test");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

const tests = require("./routes/tests");
const questionTypes = require("./routes/questionTypes");
const attempts = require("./routes/attempts");

mongoose.connect("mongodb://localhost:27017/act-analyst", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("database connected");
});

const app = express();

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/tests", tests);
app.use("/types", questionTypes);
app.use("/attempts", attempts);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
