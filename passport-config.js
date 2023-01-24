const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport=require("passport");
const {User:mongooseUser} = require("./mongoose-config");
const bcrypt = require('bcrypt');
var md5 = require('md5');

// mongooseUser.findOne({email:"anandanmb01@gmail.com"},(e,d)=>{console.log(d);});

//----------------------------- Social login--------------------------------//
//-----------------------------google----------------------------
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${global.serverUrl}/auth/google/callback`

  },
  function(accessToken, refreshToken, profile, done) {
    const hash_ = md5(profile.id+"_google");

    mongooseUser.findOne({id:hash_},async (e,d)=>{
      // console.log(d);
      if(e){
        return done(e);
      }else{

        if(d==null){
          const password = await bcrypt.hash(Math.random().toString(36),10)
          const usr={
            username:profile.emails[0].value.split("@")[0]+`_gmail`+`_eternity`,
            name:profile.displayName.split(" ").join("_"),
            id:hash_,
            email:profile.emails[0].value,
            photo:profile.photos[0].value,
            authType:"google",
            password:password,
          }
          mongooseUser.insertMany([usr],(e,data)=>{
            if(e){
              return done(e);
            }
            if(data){
              return done(null,usr);
            }
          });
        }else{
          return done(null,{username:d.username,name:d.name,id:d.id,email:d.email,authType:d.authType,expiry:d.expiry,accounts:d.accounts,createdOn:d.createdOn,});
        }
      }
    });
  }
));

//------------------------Github-----------------------

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${global.serverUrl}/auth/github/callback`
},
function(accessToken, refreshToken, profile, done) {

  const hash_ = md5(profile.id+"_github");

  mongooseUser.findOne({id:hash_},(e,d)=>{
    // console.log(d);
    if(e){
      return done(e);
    }else{

      if(d==null){
        const usr={
          username:`${profile.username}_github`,
          email:profile._json.email,
          id:hash_,
          photo:profile.photos[0].value,
          name:profile.displayName.split(" ").join("_"),
          authType:"github",
        }
        mongooseUser.insertMany([usr],(e,data)=>{
          if(e){
            return done(e);
          }
          if(data){
            return done(null,{usr});
          }
        });
      }else{
        return done(null,{username:d.username,name:d.name,id:d.id,email:d.email,authType:d.authType,expiry:d.expiry,accounts:d.accounts,createdOn:d.createdOn,});
      }
    }
  });
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

  const hash_ = md5(profile.id+"_facebook");

  mongooseUser.findOne({id:hash_},(e,d)=>{
    // console.log(d);
    if(e){
      return done(e);
    }else{

      if(d==null){
        const usr={
          username:`${profile.emails[0].value.split("@")[0]}_facebook`,
          email:profile.emails[0].value,
          id:hash_,
          photo:profile.photos[0].value,
          name:profile.displayName.split(" ").join("_"),
          authType:"facebook"
        }
        mongooseUser.insertMany([usr],(e,data)=>{
          if(e){
            return done(e);
          }
          if(data){
            return done(null,{usr});
          }
        });
      }else{
        return done(null,{username:d.username,name:d.name,id:d.id,email:d.email});
      }
    }
  });

}
));
//------------------------------Local-----------------------------------

passport.use(new LocalStrategy(
  function(username, password, done) {
      mongooseUser.findOne({username:username})
      .then(d =>{
        // console.log(d);
        if (d===null){
          // console.log("user not found");
          return done(null, false);
          
        }else{                                                                                                                                                
            bcrypt.compare(password, d.password ).then(function(result) {
              if (result){
                // console.log("user found passward match");
                return done(null, {username:d.username,name:d.name,id:d.id,email:d.email,authType:d.authType,expiry:d.expiry,accounts:d.accounts,createdOn:d.createdOn,})
              }
              else{
                // console.log("user found password mismatch");
                return done(null, false);
              }
            });       

        }
        
      })
      .catch(error => {
        // console.log("user auth error");
        return done(error);});
  }
));

//---------------------------------------------------------------


passport.serializeUser((user,done)=>{
  done(null,user);
});

passport.deserializeUser((user,done)=>{
  done(null,user);
});