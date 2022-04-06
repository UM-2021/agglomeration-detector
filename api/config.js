const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const config = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE: process.env.DATABASE,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

module.exports = config;
