require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

function sendSMS(phone, message) {
  client.messages
    .create({
      body: message,
      from: "+15818074206",
      to: phone,
    })
    .then((message) => console.log(message.sid));
}
