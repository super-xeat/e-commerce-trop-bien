


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xeatteam@gmail.com',
    pass: 'zcfs wjim hywh uybf'
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = transporter;
