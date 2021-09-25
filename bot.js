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
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    console.log(`Loaded event: ${event.name} ON` );
    client.on(event.name, (...args) => event.execute(...args));
  }
}
// Login to Discord with your client's token
client.login(token);
