const mongoose = require("mongoose");
require("dotenv").config();

const {
  forms,
  types,
  descriptions,
  english_qts,
  math_qts,
  reading_qts,
  science_qts,
  scales,
} = require("./seedHelpers");
const Test = require("../models/test");
const Question = require("../models/question");
const Attempt = require("../models/attempt");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/act-analyst";

console.log("DB: ", dbUrl);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("database connected");
});

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getRandom() {
  var num = Math.random();
  return num < 0.8 ? 0 : 1;
}

function randomAnswer() {
  const random4 = Math.floor(Math.random() * 4);
  const choice = ["A", "B", "C", "D"][random4];
  const arr = ["skip", "noTime", "guess", "revised"];
  var tags = [];
  for (let tag of arr) {
    if (getRandom() == 1) {
      tags.push(tag);
    }
  }
  return {
    choice,
    tags,
  };
}

function getRandAnswerArr(num) {
  var arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomAnswer());
  }
  return arr;
}

const seedDB = async () => {
  await Test.deleteMany({ _id: { $ne: "614e6dc98f72920016c4469e" } });
  for (let i = 0; i < 4; i++) {
    const random18 = Math.floor(Math.random() * 18);
    const name = forms[random18];
    const d = randomDate(new Date(2012, 0, 1), new Date());
    const test = new Test({
      form: `${name}`,
      date: `${d}`,
      scales: {
        ...scales,
      },
      questions: {
        english: [],
        math: [],
        reading: [],
        science: [],
      },
    });
    for (let i = 1; i < 76; i++) {
      const random4 = Math.floor(Math.random() * 4);
      const random66 = Math.floor(Math.random() * 66);
      const question = new Question({
        test: test._id,
        index: i,
        answer: ["A", "B", "C", "D"][random4],
        type: english_qts[random66],
      });
      await question.save();
      test.questions.english.push(question);
    }
    for (let i = 1; i < 61; i++) {
      const random4 = Math.floor(Math.random() * 4);
      const random26 = Math.floor(Math.random() * 26);
      const question = new Question({
        test: test._id,
        index: i,
        answer: ["A", "B", "C", "D"][random4],
        type: math_qts[random26],
      });
      await question.save();
      test.questions.math.push(question);
    }
    for (let i = 1; i < 41; i++) {
      const random42 = Math.floor(Math.random() * 42);
      const random4 = Math.floor(Math.random() * 4);
      const question = new Question({
        test: test._id,
        index: i,
        answer: ["A", "B", "C", "D"][random4],
        type: reading_qts[random42],
      });
      await question.save();
      test.questions.reading.push(question);
    }
    for (let i = 1; i < 41; i++) {
      const random4 = Math.floor(Math.random() * 4);
      const random26 = Math.floor(Math.random() * 26);
      const question = new Question({
        test: test._id,
        index: i,
        answer: ["A", "B", "C", "D"][random4],
        type: science_qts[random26],
      });
      await question.save();
      test.questions.science.push(question);
    }
    await test.save();
  }
  const tests = await Test.find({});
  const ind1 = Math.floor(Math.random() * tests.length);
  const ind2 = Math.floor(Math.random() * tests.length);
  const ind3 = Math.floor(Math.random() * tests.length);
  await Attempt.deleteMany({});
  for (let test of [tests[ind1], tests[ind2], tests[ind3]]) {
    const attempt = new Attempt({
      test: test._id,
      dateTaken: randomDate(new Date(2012, 0, 1), new Date()),
      owner: "614e5dfb83c8c0b752d831d4",
      answers: {
        english: getRandAnswerArr(75),
        math: getRandAnswerArr(60),
        reading: getRandAnswerArr(40),
        science: getRandAnswerArr(40),
      },
    });
    await attempt.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
