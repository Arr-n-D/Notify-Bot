import { Client } from "discord.js";
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  execute(client: Client) {
    console.log(chalk.green(`Ready! Logged in as ${client?.user?.tag}`));
  },
};
