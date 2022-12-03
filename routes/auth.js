const router = require("express").Router();
const passport = require("passport");


//-----------------------------Google--------------------------------//

router.get("/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.SERVER_CLIENT_URL+"login",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect(process.env.SERVER_CLIENT_URL);
  }
);

//-----------------------------Github----------------------------//

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: process.env.SERVER_CLIENT_URL+'login' ,failureMessage: true,}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.SERVER_CLIENT_URL);
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
