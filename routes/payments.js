const Razorpay = require('razorpay');
const {paymentPlans} =require("../data/paymentPlans.js");
const router = require("express").Router();
const {Order,User} = require("../mongoose-config");
const {setVpnExp} =require("../routes/api")
  

//-----------------------------Plans--------------------------------//
router.post("/plans",(req,res)=>{
  res.json(paymentPlans);
})


router.post('/getRazorpayKey', (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post('/createOrder', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: parseInt(paymentPlans[req.body.planId].amount),
      currency: 'INR',
    };
    console.log(options)
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/payOrder', async (req, res) => {
  try {
    const { planId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
    // console.log(planId);
    isPaid: true,
      date:new Date(),
      planId:planId,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });

    await newOrder.save();
    
    const cexp=new Date(req.user.expiry)
    let lexp =  new Date();
    lexp.setDate(cexp.getDate() + paymentPlans[planId].noOfDays);
    req.user.expiry=lexp;
    await User.updateOne({id:req.user.id}, { $set: {expiry:lexp} });
    const diff =lexp.getDate()- (new Date()).getDate();
        console.log(`diff = ${diff}`);

    await setVpnExp(req.body.hub,req.user.username,diff)

    res.send({
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post('/listOrders', async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});







module.exports = router;