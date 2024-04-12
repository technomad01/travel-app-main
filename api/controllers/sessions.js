const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userSchema.js");

const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_SECRET;

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else if (
      !foundUser ||
      foundUser.length <= 0 ||
      foundUser === undefined ||
      foundUser === null
    ) {
      res.status(404).send("Invalid User ID or Password");
    } else if (foundUser || foundUser.length > 0) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const userDetails = foundUser.toJSON();
        const userCookie = userDetails.uuid;
        const token = jwt.sign(userDetails, secret, {
          expiresIn: 60 * 60 * 24,
        });
        res
          .status(200)
          .cookie("access_token", token)
          .cookie("userID", userDetails.uuid)
          .cookie("username", userDetails.username)
          .send();
        // .send({ username: foundUser.username, token: token });
      } else {
        res.status(401).send("Invalid Password");
      }
    } else {
      res.status(500).send("Internal Server Error");
    }
  });
});

router.delete("/", (req, res) => {
  res
    .clearCookie("access_token")
    .clearCookie("userID")
    .clearCookie("username")
    .status(200)
    .send();
});

module.exports = router;
