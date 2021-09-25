require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
import { Twilio } from "twilio";

const client = new Twilio(accountSid, authToken);

function sendSMS(phone : string, message: string) {
  client.messages
    .create({
      body: message,
      from: "+15818074206",
      to: phone,
    })
    .then((messageRtn) => console.log(messageRtn.sid));
}
