const mongoose = require("mongoose");
const { forms, types, descriptions } = require("./seedHelpers");
const Test = require("../models/test");
mongoose.connect("mongodb://localhost:27017/act-analyst", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("database connected");
});

const seedDB = async () => {
  await Test.deleteMany({});
  for (let i = 0; i < 18; i++) {
    const random4 = Math.floor(Math.random() * 4);
    const test = new Test({
      form: `${forms[i]}`,
      type: `${types[random4]}`,
      description: `${descriptions[i]}`,
    });
    await test.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
