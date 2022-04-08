const mongoose = require("mongoose");
const validator = require("validator");
const { validate } = require("./text");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can't be your Password");
      }
    },
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("userModel", userSchema);
