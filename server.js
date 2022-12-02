const env = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport-config");
const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const cors = require("cors");

global.clienturl = "http://localhost:3000";
global.serverurl = "http://localhost:5000";

const app = express();

//--------------------------Middleware initilization---------------------------------//

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(
  session({
    secret: "cookie secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: global.clienturl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//-------------------Safety middleware----------------------------------//

app.use("/api", (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ redirect: true });
  }
});

app.use("/auth", authRouter);
app.use("/api", apiRouter);

//---------------------------Route-----------------------------------------//
app.route("/").get((req, res) => {
  res.render("home");
});

app.get("/api", (req, res) => {
  res.json({ status: "hello" });
});

//---------------------------Server initilization--------------------------//

app.listen(5000, () => {
  console.log("server started on port 5000");
});
