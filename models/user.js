const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  attempts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attempt",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
