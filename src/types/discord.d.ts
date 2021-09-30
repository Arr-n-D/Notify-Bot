import { Message, Collection } from "discord.js";
import { SubscriptionEnum } from "../enums/SubscriptionEnum";

declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, Command>;
  }

  export interface Command {
    name: string;
    description: string;
    execute: (args : any) => Promise<void>;
  }

  export interface Keyword {
    value: string;
    notificationType : SubscriptionEnum;
  }

  export interface CommandInteraction {
    getOptions: () => string[];
  }

  export interface GuildMember {
    subscriptions: Collection<number, Keyword>;
  }
}
