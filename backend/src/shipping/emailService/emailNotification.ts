import { getSubject } from "src/utils/messages";
import { Product, User } from "../../utils/interface/types";
const nodemailer = require('nodemailer');
const {getNotificationTemplate }= require('./emailTemplate');


require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.mail,
    pass: process.env.pass,
  },
});

export const sendNotification = (user:User, product:Product) => {
  try {
    const mailOptions = {
      from: process.env.mail,
      to: user.email,
      subject: getSubject(product.product),
      html: getNotificationTemplate(user, product),
    };
    console.log(`Notification sent for order ${product.product}`);
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(
      `[Notification Service]Failed to send notification:${error}`
    );
  }
};
