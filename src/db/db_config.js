const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const URL = dotenv.config().parsed.SECRET;
const URL = process.env.MONGODB_URI
mongoose.connect(URL, { useNewUrlParser: true });
const con = mongoose.connection;

module.exports = con;
