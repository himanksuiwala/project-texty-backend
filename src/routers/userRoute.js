const express = require("express");
const userRoute = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const user = require("../models/user");
var jwt = require("jsonwebtoken");
const serverAuth = require("../middleware/auth");

userRoute.get("/u", (req, res) => {
  res.status(200).send({
    msg: "ALL WORKING FINE ON USERROUTE",
  });
});

// var token = jwt.sign({ foo: "bar" }, "shhhhh");

userRoute.post("/addUser", async (req, res) => {
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user.password = bcrypt.hashSync(user.password, 10);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(501).send({
      msg: "SORRY",
    });
  }
});

userRoute.post("/post", serverAuth, async (req, res) => {
  try {
    res.status(200).send({
      msg: "HELLOW POST",
    });
  } catch (error) {
    res.status(500).send({
      e,
    });
  }
});

userRoute.post("/login", async (req, res) => {
  const userEmail = req.body.email;
  const userPass = req.body.password;

  const checkforUser = await user.findOne({ email: userEmail });
  const comparePass = await bcrypt.compare(userPass, checkforUser.password);

  if (!checkforUser) {
    res.status(400).send({
      msg: "Please create your Account First then Try Again !",
    });
  }

  if (!comparePass) {
    res.status(401).send({
      msg: "Oopsie! You might be the wrong Guy ",
    });
  }

  const generatedToken = jwt.sign(
    { _id: checkforUser._id.toString() },
    "SECRET"
  );
  checkforUser.token = generatedToken;
  // console.log(checkforUser.token);
  try {
    await checkforUser.save();
    res.status(201).send(checkforUser);
  } catch (e) {
    res.status(500).send({
      msg: e,
    });
  }
});

module.exports = userRoute;
