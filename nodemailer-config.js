const nodemailer_route = require("express").Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


// create an OAuth2 client
const oauth2Client = new OAuth2(
  process.env.Node_Mailer_Gmail_clientId,
  process.env.Node_Mailer_Gmail_clientSecret,
  `${global.serverUrl}/nodemailer/oauth2/callback`
);
console.log(`${global.serverUrl}/nodemailer/oauth2/callback`);
// define a function for sending an email
const sendEmail = (to, subject, text) => {
    // check if the access token is still valid
    oauth2Client.verifyIdToken({}, (err, login) => {
        if (err) {
            console.log(err);
            return;
        }
        // get the user's email address
        const email = login.getPayload().email;
        // create a transporter object to connect to Gmail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: email,
                clientId: process.env.Node_Mailer_Gmail_clientId,
                clientSecret: process.env.Node_Mailer_Gmail_clientSecret,
                refreshToken: oauth2Client.credentials.refresh_token,
                accessToken: oauth2Client.credentials.access_token,
                expires: 3600
            }
        });
        // define the email options
        let mailOptions = {
            from: email,
            to: to,
            subject: subject,
            text: text
        };
        // send the email
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
                // If the access token is expired, refresh it
                oauth2Client.refreshAccessToken((err, tokens) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // Update the credentials and send the email
                    oauth2Client.setCredentials(tokens);
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                });
            } else {
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        });
    });
};

nodemailer_route.get('/auth', (req, res) => {
  // generate the auth URL
  const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.send']
  });

  // redirect the user to the auth URL
  res.redirect(authUrl);
});

// define a route for the OAuth2 callback
nodemailer_route.get('/oauth2/callback', (req, res) => {
  // get the authorization code from the query parameters
  const code = req.query.code;

  // exchange the authorization code for an access token
  oauth2Client.getToken(code, (err, tokens) => {
      if (err) {
          console.log(err);
          res.send('An error occurred.');
          return;
      }
      // set the credentials
      oauth2Client.setCredentials(tokens);
      res.send("Authentication Successful");
  });
});

  function nodeSendMail(email,otp){
    sendEmail(email,"Signup request from eternityvpn",`Thankyou for choosing Eternity-VPN\nyour otp for signup request is  ${otp}`);
  }

  module.exports={nodeSendMail,nodemailer_route}
