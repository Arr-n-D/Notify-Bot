const { token, prefix, ownerID } = require("./data/config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
//import express
const express = require("express");
const app = express();

// create allowedChannels array
const allowedChannels = [
    "889177657328140319"
];

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
//Load Commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  console.log("Loaded command: " + command.name);
}
//When logged in...
client.on("ready", () => {
  console.log(
    "Logged in as " + client.user.username + "#" + client.user.discriminator
  );
  fs.writeFileSync(
    "./data/startTime.json",
    JSON.stringify({ startTime: new Date().getTime() })
  );
});

// create a function that checks if the msg author id is the same as the owner id
function isMessageAuthorBotOwner(msg) {
  return msg.author.id === ownerID;
}

// create a function that checks if the msg channel is in an array of channels
function isAllowedChannel(msg) {
  return allowedChannels.includes(msg.channel.id);
}

// create a function that checks if message starts with prefix
function startsWithPrefix(msg) {
  return msg.content.startsWith(prefix);
}


//When a message is received...
client.on("message", (msg) => {
  //Ignore if member is not owner
  if (!isMessageAuthorBotOwner(msg)) return;
  //Ignore if message is not in allowed channel
  if (!isAllowedChannel(msg)) return;
  //Ignore if message does not start with prefix
  if (!startsWithPrefix(msg)) return;

  //Get arguments
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  //Check command exists
  if (!client.commands.has(commandName)) return;
  //Load command object
  const command = client.commands.get(commandName);
  //Check for arguments
  if (command.requiresArgs && !args.length) {
    return msg.channel.send(
      `**That command requires arguments:**\n${prefix}${command.usage}`
    );
  }
  //Execute command
  try {
    command.execute(msg, args, client);
    msg.delete();
    console.log("Executed command: " + commandName);
  } catch (e) {
    console.log(e);
  }
});
//Login to Discord
client.login(token);
app.listen(1337);
