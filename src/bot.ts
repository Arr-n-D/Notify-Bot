import * as Discord from "discord.js";
// require dotenv config
require("dotenv").config();
import * as fs from "fs";
import * as path from "path";
const db = require("./models/");
const chalk = require("chalk");

const commandsPath = path.join(__dirname, "commands");
const eventsPath = path.join(__dirname, "events");

const token = process.env.TOKEN;
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
  ],
});
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
client.commands = new Discord.Collection();

Discord.CommandInteraction.prototype.getOptions = function (): string[] {
  // create an array
  const options: any = [];
  this.options.data.forEach((option) => {
    options[option.name] = option.value;
  });
  return options;
};

(async () => {
  try {
    await db.sequelize.authenticate();

    console.log(chalk.green(`Connected to the database`));
  } catch (error) {
    console.log(
      chalk.red(`Failed to connect to the database with err ${error}`)
    );
    process.exit(1);
  }
})();

//Load Commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  console.log(chalk.green(`Loaded command: ${command.data.name}`));
}

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  console.log(chalk.green(`Loaded command: ${command.data.name}`));
}

const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    // console log with chalk green
    console.log(chalk.green(`Loaded event: ${event.name} ONCE`));
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    console.log(chalk.green(`Loaded event: ${event.name} ON`));
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}
// Login to Discord with your client's token
client.login(token);
db.guild.sync();
db.subscription.sync();
