import { Client, Collection } from "discord.js";
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client: Client) {
    console.log(chalk.green(`Ready! Logged in as ${client?.user?.tag}`));
    client.guilds.cache.forEach((guild) => {
      guild.members.fetch().then((members) => {
        members.forEach((member) => {
          console.log(chalk.green(`${member.user.tag}#${member.user.discriminator} - ${member.user.id}`));
          member.subscriptions = new Collection();
        });
      });
    });
    client.user?.setActivity("👀 for keywords ", { type: "WATCHING" });
  },
};
