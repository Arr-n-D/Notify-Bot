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
        guild.subscriptions = new Collection();
        //push associativeUserSubs to guild.subscriptions
        for (const [memberId, subs] of Object.entries(associativeUserSubs)) {
          const member = guild.members.cache.get(memberId);
          if (!member) continue;
          for (const sub of subs) {
            const memberIdInt = parseInt(memberId);
            const newSub = sub as any
            const newKeyword: Keyword = {
              value: newSub.sub_keyword ?? "",
              notificationType: newSub.sub_type ?? "",
            };

            // get our keyword collection at index 
            const keywordCollection = guild.subscriptions.get(memberIdInt);
            if (!keywordCollection) {
              guild.subscriptions.set(memberIdInt, newKeyword);
            } else {
              keywordCollection.push(newKeyword);
            }
          }
        }

        console.log(guild.subscriptions);

        

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
