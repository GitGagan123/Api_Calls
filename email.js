const nodemailer = require('nodemailer');
require('dotenv').config();

const app_passwd = process.env.APP_PASSWORD;

const senderEmail = "musidivalasagagan@gmail.com";
const senderPassword = app_passwd;

// Set up the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure:true,
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
  tls:{
    rejectUnauthorized:false,
  },
  port:465,
});

// Email content
const mailOptions = {
  from: senderEmail,
  to: "musidivalasaharshavardhan@gmail.com",
  subject: "Sample Message",
  text: "This email is not from phone.",
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
