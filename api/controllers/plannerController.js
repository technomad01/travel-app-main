const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { generateCustomUuid } = require("custom-uuid");
const secret = process.env.AUTH_SECRET;
const dictionary = process.env.CUSTOM_UUID_DICTIONARY;

const Planner = require("../models/plannerSchema");

router.use("/", function (req, res, next) {
  const cookies = req.cookies;
  if (cookies) {
    jwt.verify(cookies.access_token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send();
      } else {
        next();
      }
    });
  }
});

router.get("/view/:id", (req, res) => {
  const uuid = req.params.id;
  Planner.findOne({ uuid: uuid }, (err, myPlanner) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else if (myPlanner) {
      res.status(200).send(myPlanner);
    } else {
      console.log("empty");
    }
  });
});

router.get("/", (req, res) => {
  const userID = req.cookies.userID;
  Planner.find({ userID: userID }, (err, myPlanner) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(200).send(myPlanner);
    }
  });
});

//***************************To Create/Insert The Attraction ********************//

//***************************To Create/Insert The Attraction ********************//

router.post("/", (req, res) => {
  const userID = req.cookies.userID;
  const uuid = generateCustomUuid(dictionary, 8);

  const plannerData = {
    uuid: uuid,
    userID: userID,
    data: [],
    ...req.body,
  };
  Planner.create(plannerData, (err, createdPlanner) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(201).send(createdPlanner);
    }
  });
});

//curl -H "Content-Type:application/json" -d '{"name":"testing","destination":"testing"}' -X POST http://
// localhost:3000/api/planner

//***************************To Delete The Attraction ****************************//

router.delete("/:uuid", (req, res) => {
  Planner.findOneAndDelete({ uuid: req.params.uuid }, (err, deletePlanner) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(200).send();
    }
  });
});

//curl -X DELETE http://localhost:3000/api/planner/6353fac2cec9b2e5acc1c11b

//***************************To Update The Attraction *****************************//

router.put("/", (req, res) => {
  const uuid = req.body.uuid;
  const data = req.body.data;
  Planner.findOneAndUpdate(
    { uuid: uuid },
    { $push: { data: data } },
    { new: true },
    (err, updatedPlanner) => {
      if (err) {
        res.status(400).send({ err: err.message });
      } else {
        res.status(200).send(updatedPlanner);
      }
    }
  );
});

router.put("/delete_data", (req, res) => {
  const uuid = req.body.uuid;
  const data = req.body.data;
  Planner.findOneAndUpdate(
    { uuid: uuid },
    { $pull: { data: { fsq_id: data } } },
    { new: true },
    (err, updatedPlanner) => {
      if (err) {
        res.status(400).send({ err: err.message });
      } else {
        res.status(200).send(updatedPlanner);
      }
    }
  );
});

//curl tested

module.exports = router;
