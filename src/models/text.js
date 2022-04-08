const mongoose = require("mongoose");
const validator = require("validator");

const textSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
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
  created: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("textModel", textSchema);
