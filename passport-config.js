const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const passport=require("passport");

//----------------------------- Social login--------------------------------//
//-----------------------------google----------------------------

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    const usr={
      username:profile.emails[0].value.split("@").join("_").split(".")[0],
      name:profile.displayName.split(" ").join("_"),
      id:profile.id,
      email:profile.emails[0].value,
      photo:profile.photos[0].value
    }
    console.log(usr);
    done(null,usr)
  }
));

//------------------------Github-----------------------

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  const usr={
    username:`${profile.username}_github`,
    email:profile._json.email,
    id:profile.id,
    photo:profile.photos[0].value,
    name:profile.displayName.split(" ").join("_")
  }
    console.log(profile);
    return done(null, usr);
}
));



//-----------------------------------------------------------------

passport.serializeUser((user,done)=>{
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user);
});

//-------------------------- Google over-------------------------------------// 