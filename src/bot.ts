import * as Discord from "discord.js"
// require dotenv config
require("dotenv").config();
import * as fs from "fs"
const db = require("./models/");

const token = process.env.TOKEN;
const client = new Discord.Client({ intents: Discord.Intents.FLAGS.GUILDS });
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
client.commands = new Discord.Collection();

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();

//Load Commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  console.log("Loaded command: " + command.data.name);
}


const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    console.log(`Loaded event: ${event.name} ONCE` );
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    console.log(`Loaded event: ${event.name} ON` );
    client.on(event.name, (...args: any) => event.execute(...args));
  }
}
// Login to Discord with your client's token
client.login(token);
db.guild.sync();
