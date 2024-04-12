const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { generateShortUuid } = require("custom-uuid");
const User = require("../models/userSchema.js");

router.post("/", (req, res) => {
  //console.log(req.body.password);
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  req.body.uuid = generateShortUuid();
  //console.log(req.body.password);

  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.status(500).send("Internal server error " + err.message);
      console.log(err);
    } else if (foundUser) {
      res.status(200).send("User exist");
    } else if (!foundUser || foundUser.length <= 0 || foundUser === undefined) {
      User.create(req.body, (err, createdUser) => {
        if (err) {
          res.status(500).send("Unable to create user" + err.message);
        } else {
          res.status(201).send("Successfully created user");
        }
      });
    }
  });
});

module.exports = router;
