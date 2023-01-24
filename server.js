const env = require("dotenv").config();
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);
const morganBody = require ('morgan-body');


const httpPort = 80;
const httpsPort=443;
const clientPort=3000;
global.serverUrl="" ;
global.clientUrl="";


const httpsOptions={
  cert:fs.readFileSync("./ssl/certificate.crt"),
  ca:fs.readFileSync("./ssl/ca_bundle.crt"),
  key:fs.readFileSync("./ssl/private.key")
}

const port = process.env.PORT || httpPort;

const app = express();

if ((process.env.NODE_ENV || "development")=="production"){
  
  global.serverUrl = process.env.SERVER_URL; 
  global.clientUrl = global.serverUrl;
  
  app.use((req,res,next)=>{
    if(req.protocol==="http"){
      res.redirect(301,`${process.env.SERVER_URL}${req.url}`);
    }next();
  });

}else{
  console.log("development server")
  global.serverUrl = `http://127.0.0.1:${port}`;
  global.clientUrl = `http://127.0.0.1:${clientPort}`;
  app.use(
        cors({
          origin: ["http://127.0.0.1:5000","http://127.0.0.1:3000","http://localhost:5000","http://localhost:3000"],
          methods: ["GET", "POST", "PUT", "DELETE"],
          credentials: true,
          preflightContinue: true,
        })
      );

  // hook morganBody to express app
  morganBody(app);
    
}

const passportConfig = require("./passport-config");
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);



const authRouter = require("./routes/auth");
const {router_api:apiRouter} = require("./routes/api");
const paymentRouter = require("./routes/payments");


//--------------------------Middleware initilization---------------------------------//






// support parsing of application/json type post data

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname+"/uploads"));
app.use(express.static(path.join(__dirname+"/client/build")));

app.use(
  session({
    secret: "cookie secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use("/api", (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.json({ redirect: true });
//   }
// });


//-------------------Safety middleware----------------------------------//



app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/payments", paymentRouter);



//---------------------------Route-----------------------------------------//

app.get("/api", (req, res) => {
  res.json({ status: "hello" });
});


app.route("*").get((req, res) => {
  // res.render("home");
  res.sendFile(path.join(__dirname,"/client/build/index.html"));
});

//---------------------------Server initilization--------------------------//

if(process.env.NODE_ENV==="production"){
  httpServer.listen(port,()=>{
    console.log(`http server started on ${port}`);
  });
  httpsServer.listen(httpsPort,()=>{
    console.log(`https server started on port ${httpsPort}`);
  });
}else{
  app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });
}
