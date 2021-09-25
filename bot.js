const { Client, Intents, Collection } = require("discord.js");
// require dotenv config
require("dotenv").config();
const fs = require("fs");
const db = require("./models/");

const token = process.env.TOKEN;
const client = new Client({ intents: Intents.FLAGS.GUILDS });
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
client.commands = new Collection();

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exitCode = 1;
  }
})();

//Load Commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  console.log("Loaded command: " + command.data.name);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(token);
