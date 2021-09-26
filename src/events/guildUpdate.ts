import { Guild } from "discord.js";
const db = require("../models");
const chalk = require("chalk");

module.exports = {
  name: "guildUpdate",
  once: false,
  async execute(oldGuild: Guild, newGuild: Guild) {
    // check if the old guild owner is not the same as the new guild owner
    if (oldGuild.ownerId !== newGuild.ownerId) {
      // find guild record in database
      const guildRecord = await db.guild.findOne({
        where: { guild_id: oldGuild.id },
      });

      // update guild record with new owner id
      await guildRecord
        .update({
          guild_owner: newGuild.ownerId,
        })
        .catch((err: Error) => {
          console.log(chalk.red(`[GUILD ${newGuild.name} ERROR UPDATING NEW OWNER]: ${err}`));
        });

      // get the new guild owner
      const newOwnerName = (await newGuild.fetchOwner()).displayName;

      console.log(
        chalk.green(
          `[GUILD ${newGuild.name} UPDATED] ${newOwnerName} is the new owner`
        )
      );
    }
  },
};
