// const nodemailer = require('nodemailer');
// const serverConfig = require('../config/serverConfig');
// const getNotificationTemplate = require('./emailTemplate');
// const messages = require('../utils/messages');
// const getSubject = require('../utils/messages');

// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: serverConfig.mail,
//     pass: serverConfig.pass,
//   },
// });

// const sendNotification = (user, product) => {
//   try {
//     const mailOptions = {
//       from: serverConfig.mail,
//       to: user.email,
//       subject: getSubject(product),
//       html: getNotificationTemplate(user.name, product),
//     };
//     console.log(`Notification sent for order ${product}`);
//     return transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error(
//       `[Notification Service]Failed to send notification:${error}`
//     );
//   }
// };

// module.exports = sendNotification;