const router = require("express").Router();
const passport = require("passport");
const {User:mongooseUser,EmailVerify} = require("../mongoose-config");
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const mongoose = require('mongoose');
const {nodeSendMail} =require('../nodemailer-config');
const md5 = require("md5");

//-----------------------------Google--------------------------------//

router.get("/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: global.clientUrl+"/login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect(global.clientUrl+"/");
    
  }
);

//-----------------------------Github----------------------------//

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: global.clientUrl+'/login' ,failureMessage: true,}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(global.clientUrl+"/");
  });

//----------------------Facebook----------------------------------------
router.get('/facebook',
  passport.authenticate('facebook', { scope: ["email"] }));

  router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: global.clientUrl+'/login' ,failureMessage: true,}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(global.clientUrl+"/");
  });

//--------------------------Local login------------------------------------
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        res.json({
          result:"Incorrect credentials",
          redirect:false,
        })}
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.json({
            result:req.user,
            redirect:"/",
          })
          // console.log(req.user);
        });
      }
    })(req, res, next);
  });

//-------------

router.post("/register",(req,res)=>{
  // console.log(req.body);

  // gen username
  const i = req.body.email.split("@");
  const uname=null;
  try{uname=i[0]+"_"+i[1].split('.')[0]+"_eternity";}
  catch{uname=i[0]+"_eternity";}

  mongooseUser.findOne({username:uname})
    .then((d)=>{
      // console.log(d);
      // in local id = hash of email
      if (d===null){
        bcrypt.hash(req.body.password,5).then(function(hash) {
          // Store hash in your password DB.
          const usr = new mongooseUser({
            name:req.body.name,
            username:uname,
            email:req.body.email,
            photo:req.body.photo,
            id:md5(req.body.email),       //hash of email
            authType:"local",
            password:hash,
          })
          
          usr.save()
          res.json({
            result:"user created",
            redirect:"/",
          })
      });
      }else{
        res.json({
          result:"user already exist",
          redirect:"/login"
        })}})
        .catch(error => console.log(error));
});

//--------------------------------------------------------------

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        res.json({status:false})
        return next(err);
      }
      res.json({status:true})
    });

  });

  
router.post("/getusr",(req,res)=>{

    if(req.isAuthenticated()){
        res.json({status:true,user:req.user});
    }else{
        res.json({status:false,user:null});
    }
});

router.post("/verifyemail",(req,res)=>{
  // console.log(req.body.email)
  const otp = otpGenerator.generate(6, {digits:true, lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false});

  EmailVerify.findOneAndUpdate({email:req.body.email}, { $set: { otp: otp }}, { upsert: true, new: true, setDefaultsOnInsert: true }, ()=>{});

      nodeSendMail(req.body.email,otp);
      res.json({status:"ok"});
      setTimeout(()=>{
        EmailVerify.deleteOne({email:req.body.email},(e)=>{})
      }, 30000);
});

router.post("/verifyotp",(req,res)=>{
  EmailVerify.find({ email: req.body.email}, function (err, docs) {
    if (docs===[]){
      res.json({status:"Time out"})
    }else{
      if(docs[0].otp===req.body.otp){
        res.json({status:"ok"})
      }else{
        res.json({status:"otp verification failed"})
      }
    }
    // console.log(docs);
  });
})

module.exports = router;
