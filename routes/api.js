const router_api = require("express").Router();
const {User:mongooseUser} = require("../mongoose-config");
const trialdays=5;
const mongoose=require("mongoose");
const { User,Order }=require( "../mongoose-config");
const moment = require("moment");



const {
  vpncmd,
  India__eternity_hub,
  India__eternity_hub_01,
  India__eternity_hub_02,
  India__eternity_hub_03,
  India__eternity_hub_04,
  India__eternity_hub_05,
  Qatar__eternity_hub,
  Qatar__eternity_hub_01,
  Qatar__eternity_hub_02,
  Qatar__eternity_hub_03,
} = require("../vpncmd-config");

//----------------------------------------------//
router_api.post("/vpn/test",(req,res)=>{
  console.log(req.user);
  res.json({res:"ok"});
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

async function setVpnExp(hub_id,username,days){
  const day = moment();
  day.add(Number(days), 'day')
  return(await eval(hub_id).executeCommand(`UserExpiresSet ${username} /EXPIRES:"${String(day.year()).padStart(4, '0')}/${String(day.month()+1).padStart(2, '0')}/${String(day.date()).padStart(2, '0')} ${String(day.hour()).padStart(2, '0')}:${String(day.minute()).padStart(2, '0')}:${String(day.second()).padStart(2, '0')}"`))
}

router_api.post("/vpn", (req, res) => {
  const hub_id = req.body.hubid;
  const username = req.body.username;
  const days = Number(req.body.days);
  console.log( "exec set exp fun");

  setVpnExp(hub_id, username, days)
    .then((x) => {
      console.log(x);
      res.json({ res: "ok" });
    })

    .catch((e) => {
      console.log(e);
      res.json({ res: "error" });
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////


//------------------ routes---------------------------//
router_api.post("/vpn/connect", (req, res) => {

    eval(req.body.hub_id)
        .executeCommand(`UserGet ${req.user.username}`)
        .then((resp) => {
          res.json({
            redirect: false,
            data: resp,
            error:null
          });
        })
        .catch((e)=>{
            console.log(e);
            res.json({
                redirect:false,
                error:true
            })
        })    
});

router_api.post("/vpn/createuser",async (req,res,next)=>{

    try{
    await eval(req.body.hub_id).executeCommand(`UserCreate ${req.user.username} /GROUP:none /REALNAME:${req.user.name} /NOTE:${req.user.id}`)
    await eval(req.body.hub_id).executeCommand(`UserPasswordSet ${req.user.username} /PASSWORD:${req.body.password}`)
    const today=moment()

    console.log(`created  on ${req.user.createdOn}`);
      if(req.user.createdOn==null){
        (async ()=>{ 
        
        const date_ob=moment()
        date_ob.add(trialdays,"day")
          await User.updateOne({id:req.user.id}, { $set: { createdOn: today,expiry:date_ob} });
          await Order.create({date:today,planId:-1});
          req.user.createdOn=today;
          req.user.expiry=date_ob;
          await setVpnExp(req.body.hub_id,req.user.username,trialdays);
        })();
      }else{
        const diff = today.diff(today, "day");
        (async ()=>{
          await setVpnExp(req.body.hub_id,req.user.username,diff);
        })();
      }

    res.json({error:false});
    
  }catch(e){
        console.log(e);
          res.json({
              error:true
          })
      }
});

router_api.post("/vpn/deleteuser",(req,res)=>{
  eval(req.body.hub_id)
  .executeCommand(`UserDelete ${req.user.username}`)
  .then((resp) => {
    res.json({
      error:null
    });
  }).catch((e)=>{
    console.log(e);
      res.json({
          error:true
      })
  })
});

router_api.post("/vpn/changeusrpsk",(req,res)=>{
  eval(req.body.hub_id).executeCommand(`UserPasswordSet ${req.user.username} /PASSWORD:${req.body.password}`)
  .then((resp) => {
    res.json({
      error:null
    });
  }).catch((e)=>{
    console.log(e);
      res.json({
          error:true
      })
  })
});

//------------------------------export---------------//
module.exports = {router_api,setVpnExp};
/////////////////////////////////////////////////////////////

// commands for node test

// const VPNCMD=require("vpncmd");
// const vpncmd = new VPNCMD({
//     bin: 'vpnclient/vpncmd',
//     address: "43.205.75.80",
//     port: "443",
//     password: "Anandan@hub@03",
//     hub:"eternity_hub"
//   });

// function cmd(cmd){
//     vpncmd.executeCommand(cmd).then((users)=>{
//         console.log(users)
//     });
// };
// cmd("userlist");
