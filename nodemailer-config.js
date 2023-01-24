const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      clientId: process.env.Node_Mailer_Gmail_clientId,
      clientSecret: process.env.Node_Mailer_Gmail_clientSecret,
    },
  });
  

  function nodeSendMail(email,otp){
    transporter.sendMail({
        from: "eternityvpn.assistant@gmail.com",
        to: email,
        subject: "Signup request from eternityvpn",
        text: `Thankyou for choosing Eternity-VPN\nyour otp for signup request is  ${otp}`,
        auth: {
          user: "eternityvpn.assistant@gmail.com",
          refreshToken: process.env.Node_Mailer_Gmail_refreshToken,
          accessToken: process.env.Node_Mailer_Gmail_accessToken,
          expires: parseInt(process.env.Node_Mailer_Gmail_expires),
        },
      }).catch((e)=>{console.log(e)});
  }

module.exports={nodeSendMail}
