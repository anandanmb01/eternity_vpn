const router_api = require("express").Router();
const {User:mongooseUser} = require("../mongoose-config");
const trialdays=5;
const mongoose=require("mongoose");
const { User,Order }=require( "../mongoose-config");
const moment = require("moment");
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');


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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

upload = multer({ storage });


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

  if(!hub_id || !username || !days){
    return res.status(400).json({ res: "error", message: 'hub_id, username and days are required in the request body' });
  }

  setVpnExp(hub_id, username, days)
    .then((x) => {
      res.status(200).json({ res: "ok" });
      console.debug('200 OK: VPN Exp set successfully');
    })

    .catch((e) => {
      console.log(e);
      res.status(400).json({ res: "error", message: e });
      console.debug('400 Bad Request: Error Occured while setting VPN Exp');
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////


//------------------ routes---------------------------//
router_api.post("/vpn/connect", (req, res) => {

  eval(req.body.hub_id)
  .executeCommand(`UserGet ${req.user.username}`)
  .then((resp) => {
    console.debug('200 OK: VPN connected successfully');
    res.status(200).json({
      redirect: false,
      data: resp,
      error:null
    });
  })
  .catch((e)=>{
      console.log("Error connecting to VPN: ", e);
      res.status(500).json({
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

  // console.log(`created  on ${req.user.createdOn}`);
    if(req.user.createdOn==null){
      (async ()=>{ 
      
      const date_ob=moment()
      date_ob.add(trialdays,"day")
        await User.updateOne({id:req.user.id}, { $set: { createdOn: today,expiry:date_ob} });
        await Order.create({date:today,planId:-1,userId:req.user.id,razorpay:{paymentId:"trial"},isPaid:false});
        req.user.createdOn=today;
        req.user.expiry=date_ob;
        await setVpnExp(req.body.hub_id,req.user.username,trialdays);
      })();
    }else{
      const diff = moment(req.user.expiry).diff(today, "day");
      (async ()=>{
        await setVpnExp(req.body.hub_id,req.user.username,diff);
      })();
    }

  res.json({error:false});
  
}catch(e){
      console.debug('400 Bad Request: Error Occured while creating VPN User');
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
    console.debug('400 Bad Request: Error Occured while deleting VPN User');
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
    console.debug('400 Bad Request: Error Occured while changing VPN User Password');
    console.log(e);
      res.json({
          error:true
      })
  })
});


router_api.post('/avatarimage', upload.single('image'), (req, res) => {
  mongooseUser.updateOne({id:req.user.id},{imgpath:req.file.path},(e,d)=>{console.log(e);});
  if (!req.file) {
    return res.status(400).json({message: "No file uploaded"});
  }
  res.status(200).json({message: "File uploaded"});
});

router_api.post("/getimg", async (req, res) => {
  try {
    const user = await mongooseUser.findOne(
      { id: req.user.id },
      { imgpath: 1, photo: 1 }
    );
    console.log(user);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }else{
            if (user.imgpath) {
              const filePath = path.join(__dirname, "/../",user.imgpath);
              return res.status(200).sendFile(filePath, {}, (err) => {
                if (err) {
                  return res.status(500).send(err);
                }
              });
            }else{
              if (user.photo) {
                const imageUrl = user.photo;
                const { data } = await axios({
                  method: "GET",
                  url: imageUrl,
                  responseType: "arraybuffer",
                });
                res.set("Content-Type", "image/jpeg");
                return res.status(200).send(data);
              }else{
                const filePath = path.join(__dirname, "/../uploads/","login.png");
                return res.sendFile(filePath)
              }
            }
          }
  } catch (error) {
    console.debug('400 Bad Request: Error Occured while getting user image');
    console.error(error);
    return res.status(500).send({ error: "Failed to get user image" });
  }
});



//------------------------------export---------------//
module.exports = {router_api,setVpnExp};
