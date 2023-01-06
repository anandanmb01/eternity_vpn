const router_api = require("express").Router();
const passport = require("passport");
const freeTireDays=3;

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

router_api.post("/vpn/createuser",(req,res)=>{
  (async ()=>{
    const today = new Date()
    let date_ob =  new Date()
    date_ob.setDate(today.getDate() + freeTireDays);
    try{
    await eval(req.body.hub_id).executeCommand(`UserCreate ${req.user.username} /GROUP:none /REALNAME:${req.user.name} /NOTE:${req.user.id}`)
    await eval(req.body.hub_id).executeCommand(`UserPasswordSet ${req.user.username} /PASSWORD:${req.body.password}`)
    await eval(req.body.hub_id).executeCommand(`UserExpiresSet ${req.user.username} /EXPIRES:"${String(date_ob.getFullYear()).padStart(4, '0')}/${String(date_ob.getMonth()).padStart(2, '0')}/${String(date_ob.getDate()).padStart(2, '0')} ${String(date_ob.getHours()).padStart(2, '0')}:${String(date_ob.getMinutes()).padStart(2, '0')}:${String(date_ob.getSeconds()).padStart(2, '0')}"`)

    res.json({
      error:false
  });
  
  }catch(e){
        console.log(e);
          res.json({
              error:true
          })
      }
})();
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
module.exports = router_api;
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
