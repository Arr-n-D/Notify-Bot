// import { SlashCommandBuilder } from require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";
import {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Interaction,
} from "discord.js";

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
  async execute(interaction: any) {
    await interaction.deferReply({ ephemeral: true });

    // get the keywords
    const keywords = interaction.getOptions().map((option:any) => option.value);

    console.log(keywords);
  },
};
