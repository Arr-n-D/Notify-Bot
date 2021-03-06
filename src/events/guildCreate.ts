import { Guild } from "discord.js";
const db = require("../models")
const chalk = require("chalk");

module.exports = {
  name: "guildCreate",
  once: false,
  async execute(guild: Guild) {
    if (!guild.available) return;
    console.log(guild.ownerId)      

    // check if the db has the guild
    const guildExists = await db.guild.findOne({ where: { guild_id: guild.id } })

    if (!guildExists) {
        // create the guild
        await db.guild.create({
            guild_id: guild.id,
            guild_name: guild.name,
            guild_owner: guild.ownerId,
            guild_prefix: "??",
        }).then(() => {
            console.log(chalk.green(`[GUILD CREATED] ${guild.name}`))
        }).catch((err: Error) => {
            console.log(chalk.red(`[GUILD CREATION ERROR] ${err}`))
        })
    }
  },
};
