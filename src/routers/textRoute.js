const express = require("express");
const textRoute = express.Router();
const textModel = require("../models/text");

textRoute.get("/", (req, res) => {
  res
    .status(201)
    .send(
      '<div style="margin: 0 auto;"><h1>THIS IS A SERVER FOR textY<h1></h1></div>'
    );
});

textRoute.post("/add", async (req, res) => {
  const sentText = new textModel({
    title: req.body.title,
    body: req.body.body,
    email: req.body.email,
  });

  try {
    await sentText.save();
    res.status(201).send({ sentText, msg: "Successfully Added!" });
  } catch (e) {
    res.status(500).send({
      msg: e,
    });
  }
});

textRoute.get("/user", async (req, res) => {
  const user = req.query.userId;

  const data = await textModel.find({ email: user });
  if (!data.length) {
    res.status(401).send({ msg: "No Such Email Exists" });
  } else {
    try {
      res.status(201).send(data);
    } catch (e) {
      res.status(500).send({ msg: e });
    }
  }
});

module.exports = textRoute;
