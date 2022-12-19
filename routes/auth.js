const router = require("express").Router();
const passport = require("passport");
const {User:mongooseUser} = require("../mongoose-config");
const bcrypt = require('bcrypt');

//-----------------------------Google--------------------------------//

router.get("/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: global.clientUrl+"login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect(global.clientUrl)+"/";
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
// router.post('/login',(req,res,next)=>{
//   passport.authenticate('local',(err, user, info)=>{
//     console.log("iam here");
//   })
// });

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
  const uname=req.body.email.split("@")[0]+"_eternity";
  mongooseUser.findOne({username:uname})
    .then((d)=>{
      // console.log(d);

      if (d===null){
        bcrypt.hash(req.body.password,5).then(function(hash) {
          // Store hash in your password DB.
          const usr = new mongooseUser({
            name:req.body.name,
            username:uname,
            email:req.body.email,
            photo:req.body.photo,
            id:"",
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

module.exports = router;
