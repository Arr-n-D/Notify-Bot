// import { SlashCommandBuilder } from require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
const db = require("../models");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("subscribe")
    .setDescription("Subscribe to keywords to be notified for")
    .addStringOption((option) =>
      option
        .setName("keyword")
        .setDescription("First keyword you want to be notified for")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("keyword2")
        .setDescription("Second keyword you want to be notified for")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("keyword3")
        .setDescription("Third keyword you want to be notified for")
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    // get the keywords

    // get the keywords
    const keywords = Object.values(interaction.getOptions());

    // check if any keywords are duplicates of each other
    const duplicateKeywords = keywords.filter((keyword, index) => {
      return keywords.indexOf(keyword) !== index;
    });

    if (duplicateKeywords.length > 0) {
      await interaction.editReply(
        `You have entered duplicate keywords. Please try again.`
      );

      return;
    }
    // make an array of keywords that successfuly subscribed to
    const subscribedKeywords: string[] = [];

    // for of loop to subscribe to each keyword
    for (const keyword of keywords) {
      // check if keyword is already subscribed to
      const existingSubscription = await db.Subscription.findOne({
        where: { sub_keyword: keyword },
    keywords.forEach(async (element) => {
      // check if keyword is already in the database
      // if not, add it
      // if it is, do nothing
      const [instance, created] = await db.subscription.findOrCreate({
        where: {
          sub_keyword: element,
        },
        defaults: {
          sub_member_id: interaction?.member?.user.id,
          sub_active: true,
        },
      });

      if (created) {
        subscribedKeywords.push(element);
        console.log(
          chalk.green(
            `[KEYWORD ${element} CREATED FOR USER ${interaction?.member?.user.username} ON ${interaction?.guild?.name}`
          )
        );
      } else {
        console.log(
          chalk.yellow(
            `[KEYWORD ${element} ALREADY EXISTS FOR USER ${interaction?.member?.user.username} ON ${interaction?.guild?.name}`
          )
        );
      }
    });

    // notify the user of which keywords were subscribed to
    if (subscribedKeywords.length > 0) {
        await interaction.editReply(
            `You have subscribed to the following keywords: ${subscribedKeywords.join(", ")}`
        );
    } else {
        await interaction.editReply(
            `You have subscribed to no keywords.`
        );
    }
    
  },
};
