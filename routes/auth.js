const router = require("express").Router();
const passport = require("passport");


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
    res.redirect(global.clientUrl);
  }
);

//-----------------------------Github----------------------------//

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: global.clientUrl+'login' ,failureMessage: true,}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(global.clientUrl);
  });

//----------------------Facebook----------------------------------------
router.get('/facebook',
  passport.authenticate('facebook', { scope: ["email"] }));

  router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: global.clientUrl+'login' ,failureMessage: true,}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(global.clientUrl);
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
