const env = require("dotenv").config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const hostname = "eternityvpn.ddns.net";
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport-config");
const cors = require("cors");
const path = require('path');

const httpPort = 80;
const httpsPort=443;

const httpsOptions={
  cert:fs.readFileSync("./ssl/certificate.crt"),
  ca:fs.readFileSync("./ssl/ca_bundle.crt"),
  key:fs.readFileSync("./ssl/private.key")
}

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

app.use((req,res,next)=>{
  if(req.protocol==="http"){
    res.redirect("https://eternityvpn.ddns.net/")
  }next();
});

const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const port = process.env.PORT || 80;


//--------------------------Middleware initilization---------------------------------//

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/client/build")));

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
    origin: process.env.SERVER_CLIENT_URL,
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

app.get("/api", (req, res) => {
  res.json({ status: "hello" });
});

app.route("*").get((req, res) => {
  // res.render("home");
  res.sendFile(path.join(__dirname,"/client/build/index.html"));
});

//---------------------------Server initilization--------------------------//

// app.listen(port, () => {
//   console.log(`server started on port ${port}`);
// });

httpServer.listen(port,()=>{
  console.log("http server started on port 80");
});
httpsServer.listen(httpsPort,()=>{
  console.log(`http server started on port ${httpsPort}`);
});