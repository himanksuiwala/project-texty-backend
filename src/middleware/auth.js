const jwt = require("jsonwebtoken");
const User = require("../models/user");

const serverAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "SECRET");

    const user = await User.findOne({
      _id: decoded._id,
      token: token,
    });

    if (!user) {
      throw new Error("NO USER FOUND");
    }

    req.token = token;
    req.user = user;
    console.log(token);
    next();
  } catch (e) {
    res.status(401).send({
      msg: "Please get Authenticated",
    });
  }
};

module.exports = serverAuth;
