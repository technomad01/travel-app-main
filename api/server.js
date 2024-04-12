require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const app = express();

const plannerController = require("./controllers/plannerController.js");
const userController = require("./controllers/users.js");
const sessionController = require("./controllers/sessions.js");

const oneDay = 1000 * 60 * 60 * 24;
const portnum = 8080;

///////////////////////////////////////////////////////////////////////

const mongoURI =
  process.env.MONGODB_URI ||
  "";

mongoose.connect(mongoURI, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", () => {
  console.log("mongodb connection error");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected from mongodb");
});

//************Middlewares*************//


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "3NLf##$G!sRRfz8oP#J#39WSzs4AYd",
    resave: false,
    cookie: { maxAge: oneDay },
    saveUninitialized: false,
  })
);

//**************Controllers**********//

app.use("/api/planner", plannerController);
app.use("/api/user", userController);
app.use("/api/session", sessionController);

//**********************Listener********************//

app.listen(portnum, () => {
  console.log("travel app is listening to port " + portnum);
});
