const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URL: process.env.MONGODB_URL,
  mail: process.env.mail,
  pass: process.env.pass,
};
