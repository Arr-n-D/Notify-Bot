import { Client, Collection, Keyword } from "discord.js";
import { resultsToAssociativeArray } from "../utils/sequelize";
const chalk = require("chalk");
const db = require("../models");
module.exports = {
  name: "ready",
  once: true,
  async execute(client: Client) {
    console.log(chalk.green(`Ready! Logged in as ${client?.user?.tag}`));
    client.guilds.cache.forEach((guild) => {
      guild.members.fetch().then(async (members) => {
        const membersId = members.map((member) => member.id);
        const userSubscriptions = await db.subscription.findAll({
          where: {
            sub_member_id: membersId,
          },
          attributes: ["sub_keyword", "sub_type", "sub_member_id"],
        });

        const associativeUserSubs = resultsToAssociativeArray(
          "sub_member_id",
          userSubscriptions
        );

        console.log(associativeUserSubs);

        

        // loop over associativeUserSubs and add to guild.members

        // members.forEach((member) => {
        //   member.subscriptions = new Collection();
        //   const memberSubscriptions = associativeUserSubs[member.id];
        //   if (memberSubscriptions) {
        //     // for let i loop
        //     for (let i = 0; i < memberSubscriptions.length; i++) {
        //       const { sub_keyword, sub_type } = memberSubscriptions[i] as any;
        //       // const { sub_keyword, sub_type } = subscription as any;
        //       const newKeyword: Keyword = {
        //         value: sub_keyword,
        //         notificationType: sub_type,
        //       };
        //       member.subscriptions.set(
        //         member.subscriptions.size + 1,
        //         newKeyword
        //       );
        //     }
        //   }
        // });
      });
    });
    client.user?.setActivity("👀 for keywords ", { type: "WATCHING" });
  },
};
