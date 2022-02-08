// BOT CONFIGURATION
// Contain Token
const fs = require('fs');
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

const {Client, Intents} = require("discord.js");
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

bot.login(SettBot.Token);

/* Notes
ID Client : mel2cmg1j4k52778y39o43tdfmy54j
Token : yym2ztvj3ckraegzz90xry7untoo8f



 */