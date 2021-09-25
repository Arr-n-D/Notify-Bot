// import { SlashCommandBuilder } from require("@discordjs/builders");
import { SlashCommandBuilder } from "@discordjs/builders";
import {MessageEmbed, MessageActionRow, MessageButton, Interaction} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Registers a new user")
    .addStringOption((option) =>
      option
        .setName("firstname")
        .setDescription("First name for the account")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("lastname")
        .setDescription("Last name for the account")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("phone")
        .setDescription("Phone number for the account")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription("Email for the account")
        .setRequired(true)
    ),
  async execute(interaction: any) {
    await interaction.deferReply({ephemeral: true});

    const confirmEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Confirm options")
      .setURL("https://discord.js.org/")
      .setAuthor(
        "Some name",
        "https://i.imgur.com/AfFp7pu.png",
        "https://discord.js.org"
      )
      .setDescription("Are these informations correct?  ")
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .addFields(
        {
          name: "First name",
          value: interaction.options.get("firstname").value,
          inline: true,
        },
        {
          name: "Last name",
          value: interaction.options.get("lastname").value,
          inline: true,
        },
        {
          name: "Phone number",
          value: interaction.options.get("phone").value,
          inline: true,
        },
        {
          name: "Email",
          value: interaction.options.get("email").value,
          inline: true,
        }
      )
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setTimestamp()
      .setFooter("Provided by NotifyBot", "https://i.imgur.com/AfFp7pu.png")
      // .setEphemeral();?

    const confirmedBtn = new MessageButton()
      .setCustomId("confirmBtn")
      .setLabel("Yes")
      .setStyle("PRIMARY");
      

    const dangerBtn = new MessageButton()
      .setCustomId("dangerBtn")
      .setLabel("No")
      .setStyle("DANGER");

    const row = new MessageActionRow().addComponents(confirmedBtn, dangerBtn);

    await interaction.editReply({
      // content: "Pong!",
      ephemeral: true,
      embeds: [confirmEmbed],
      components: [row],
    });

    const filter = (i : any) =>
      i.customId === "confirmBtn" || i.customId === "dangerBtn";

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (i: any) => {
      if (i.customId === "confirmBtn") {
        await i.deferReply("Waiting...");
        // look up database to see if email or phone are already registered
        // if not, create new user
        // if so, send error message
        // if success, send success message
        // await interaction.editReply({

      } else if (i.customId === "dangerBtn") {
        await i.update({
          content: "Cancelled.",
          components: [],
          ephemeral: true,
        });
      }
    });
  },
};
