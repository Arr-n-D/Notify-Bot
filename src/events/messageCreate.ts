import { Message } from "discord.js";
import * as Utils from "../utils";
const db = require("../models");
const chalk = require("chalk");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message: Message) {
    // store the guild in a const
    const guild = message.guild;

    // loop over the guild members

    guild?.members.fetch().then((members) => {
      // loop over the members
      members.forEach((member) => {
        const sizeofSubscription = member?.subscriptions?.size || 0;
        if (sizeofSubscription > 0) {
          for (let i = 1; i < sizeofSubscription + 1; i++) {
            const keyword = member?.subscriptions.get(i);
            const valueOfKeyword = keyword?.value || "";
            const notificationType = keyword?.notificationType;

            const [, ...args] = message.content.split(" ");

            // check if ...args contains the keyword
            if (args.includes(valueOfKeyword)) {
              console.log(notificationType);
              // switch case over the notification type
              switch (notificationType) {
                case "dm":
                  // send a DM to the user
                  member.send(
                    `Your keyword ${valueOfKeyword} was found in the ${message.guild?.name} server, here's the link! ${message.url}`
                  );

                  break;
                case "phone":
                  Utils.sendSMS(message.content, "+14185757516");

                  break;
              }
            }
          }
        }
      });
    });
  },
};
