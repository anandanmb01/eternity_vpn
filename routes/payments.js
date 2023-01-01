const Razorpay = require('razorpay');
const {paymentPlans} =require("../data/paymentPlans.js");
const router = require("express").Router();
const {Order} = require("../mongoose-config");
  

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
      amount: paymentPlans[req.body.planId].amount,
      currency: 'INR',
    };
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
      isPaid: true,
      amount: paymentPlans[planId].amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
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