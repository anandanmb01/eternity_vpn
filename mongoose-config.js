const mongoose = require('mongoose');
  const userSchema = new mongoose.Schema({
    name:String,
    username: String,
    email: String,
    photo: String,
    id:String,
    authType:String,
    password:String,

});

const User = mongoose.model('User', userSchema);

// const usr = new User({
//   name:"Anandan",
//   username:"abc",
//   email:"ab@c",
//   photo:"///",
//   id:"123",
//   authType:"local",
//   password:"abc"
// })

// usr.save()
// User.find()
//     .then(p => console.log(p))
//     .catch(error => console.log(error));

module.exports={User}