const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport=require("passport");



//----------------------------- Social login--------------------------------//
//-----------------------------google----------------------------
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${global.serverUrl}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {

    const usr={
      username:profile.emails[0].value.split("@").join("_").split(".")[0],
      name:profile.displayName.split(" ").join("_"),
      id:profile.id,
      email:profile.emails[0].value,
      photo:profile.photos[0].value
    }
    done(null,usr)
  }
));

//------------------------Github-----------------------

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${global.serverUrl}/auth/github/callback`
},
function(accessToken, refreshToken, profile, done) {
  const usr={
    username:`${profile.username}_github`,
    email:profile._json.email,
    id:profile.id,
    photo:profile.photos[0].value,
    name:profile.displayName.split(" ").join("_")
  }
    return done(null, usr);
}
));



//----------------------------Facebook login-------------------------------------
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${global.serverUrl}/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(large)',]
},
function(accessToken, refreshToken, profile, cb) {
  const usr={
    username:`${profile.emails[0].value.split("@")[0]}_github`,
    email:profile.emails[0].value,
    id:profile.id,
    photo:profile.photos[0].value,
    name:profile.displayName.split(" ").join("_"),
  }
    console.log(usr);
    return cb(null, usr);
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