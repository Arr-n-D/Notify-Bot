// import { SlashCommandBuilder } from require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, Keyword } from "discord.js";
import { SubscriptionEnum } from "../enums/SubscriptionEnum";
import * as Utils from "../utils";
const db = require("../models");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("subscribe")
    .setDescription(
      "Command to subscribe to specific keywords to be notified for"
    )
    .addStringOption((option) =>
      option
        .setName("keyword")
        .setDescription("Keyword you want to be notified for")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("subscriptiontype")
        .setDescription("How do you wish to be notified for this keyword")
        .setRequired(true)
        .addChoice("DM", SubscriptionEnum.DM)
        .addChoice("Channel", SubscriptionEnum.CHANNEL)
        .addChoice("Phone", SubscriptionEnum.PHONE)
        .addChoice("Email", SubscriptionEnum.EMAIL)
    ),
  async execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const keyword = interaction.options.getString("keyword");
    const subscriptionType =
      interaction?.options?.getString("subscriptiontype");
    const guildMember = interaction.member;

    const subscribedKeywords: any[] = [];
    // check if keyword is already subscribed to
    const [, created] = await db.subscription.findOrCreate({
      where: { sub_keyword: keyword, sub_type: subscriptionType },
      defaults: {
        sub_member_id: guildMember?.user.id,
        sub_active: true,
        sub_type: subscriptionType,
      },
    });

    if (created) {
      subscribedKeywords.push(keyword);
      // check if type of guildMember is GuildMember
      if (
        guildMember instanceof GuildMember &&
        subscriptionType !== null &&
        Utils.isSubscriptionEnum(subscriptionType)
      ) {
        // check if subscriptionType is in SubscriptionEnum

        const newKeyword: Keyword = {
          value: keyword ?? "",
          notificationType: subscriptionType,
        };
        guildMember.subscriptions.set(
          guildMember.subscriptions.size + 1,
          newKeyword
        );
        console.log(
          chalk.green(
            `[KEYWORD ${keyword} CREATED FOR USER ${interaction?.member?.user.username} ON ${interaction?.guild?.name}`
          )
        );
      } else {
        // return error
        await interaction.editReply("An error occured");
        return;
      }
    } else {
      console.log(
        chalk.yellow(
          `[KEYWORD ${keyword} ALREADY EXISTS FOR USER ${interaction?.member?.user.username} ON ${interaction?.guild?.name}`
        )
      );
    }

    // notify the user of which keywords were subscribed to
    if (subscribedKeywords.length > 0) {
      await interaction.editReply(
        `You have subscribed to the following keyword: ${subscribedKeywords.join(
          ", "
        )}`
      );
    } else {
      await interaction.editReply(`You have subscribed to no keywords.`);
    }
  },
};
