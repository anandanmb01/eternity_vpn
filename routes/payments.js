const router = require("express").Router();
const {paymentPlans} =require("../data/paymentPlans.js");

console.log(paymentPlans);

//-----------------------------Plans--------------------------------//
router.post("/plans",(req,res)=>{
    res.json(paymentPlans);
})

module.exports = router;
