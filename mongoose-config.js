const mongoose = require('mongoose');
  const userSchema = new mongoose.Schema({
    name:String,
    username: String,
    email: String,
    photo: String,
    id:String,
    authType:String,
    password:String,
    expiry:Object,
    accounts:Object,
    createdOn:Object,
    imgpath:String,

});

const User = mongoose.model('User', userSchema);

////////////////////////////////////////////////////

  const emailVerifySchema = new mongoose.Schema({
    email:String,
    otp: String,

});

const EmailVerify = mongoose.model('EmailVerify', emailVerifySchema);

/////////////////////////////////////////////////////////////////////

const OrderSchema = mongoose.Schema({
  isPaid: Boolean,
  date:Object,
  userId:String,
  planId:Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});
const Order = mongoose.model('Order', OrderSchema);

module.exports={User,EmailVerify,Order}