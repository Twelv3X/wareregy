const mailer = require('nodemailer');

var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wareregy@gmail.com',
      pass: 'integracaosistemas'
    }
  });

module.exports = mailer;