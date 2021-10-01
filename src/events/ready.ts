import { Client, Collection } from "discord.js";
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
          attributes: [
            "sub_keyword",
            "sub_type",
            "sub_member_id",
          ],
        });

        const associative = resultsToAssociativeArray("sub_member_id", userSubscriptions);

        // console.log(userSubscriptions);
        // find all
        //   members.forEach((member) => {
        //     console.log(chalk.green(`${member.user.tag}#${member.user.discriminator} - ${member.user.id}`));
        //     member.subscriptions = new Collection();
        //   });
      });
    });
    client.user?.setActivity("👀 for keywords ", { type: "WATCHING" });
  },
};
