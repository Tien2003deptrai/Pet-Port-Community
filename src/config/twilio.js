require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const client = twilio(accountSid, authToken);

module.exports = client;
