const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const fs = require("fs");
//import path
const path = require("path");


const token = process.env.TOKEN;
const rest = new REST({ version: "9" }).setToken(token);
const commandsPath = path.join(__dirname, "dist", "commands");
const commands = [];
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

  //Load Commands
for (const file of commandFiles) {
  const command = require(`./dist/commands/${file}`);
  console.log("Registered command: " + command.data.name);
  commands.push(command.data.toJSON());
}

(async () => {
  try {
    await rest.put(Routes.applicationCommands("889224092711002212"), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
