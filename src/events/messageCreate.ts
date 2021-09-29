import { Message } from "discord.js";
const db = require("../models");
const chalk = require("chalk");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message: Message) {
    // store the guild in a const
    const guild = message.guild;

    const guildMember = guild?.members.cache.get(message.author.id);
    const sizeofSubscription = guildMember?.subscriptions?.size || 0;

    console.log(guildMember?.subscriptions);
    // check if size of subscriptions is over 0
    if (sizeofSubscription > 0) {
        for (let i = 0; i < sizeofSubscription; i++) {
            console.log(guildMember?.subscriptions.get(i));
        }
    }


    // find 
  },
};
