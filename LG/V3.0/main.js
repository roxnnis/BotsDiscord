// BOT CONFIGURATION
// Contain Token
var SettBot = JSON.parse(require('fs').readFileSync("../../BotConfig.json"));

//fonctions pour les différents choix du menu déroulant
const { composition } = require("./functions/dropdown/composition.js");
const { join } = require("./functions/dropdown/join.js");
const { members } = require("./functions/dropdown/members.js");
const { remove } = require("./functions/dropdown/remove.js");
const { roles } = require("./functions/dropdown/roles.js");

//Constantes

const { salons } = require("./data/id.json");//Exports
const { refresh } = require("./slash.js");

//Setup Bot (Assist-o-Bot)
const { Client, Intents, Interaction } = require('discord.js');
const bot = new Client({
	intents: [
	  Intents.FLAGS.GUILDS,
	  Intents.FLAGS.GUILD_MESSAGES,
	  Intents.FLAGS.GUILD_MEMBERS,
	  Intents.FLAGS.GUILD_PRESENCES,
	  Intents.FLAGS.DIRECT_MESSAGES
	],
  });
bot.login(SettBot.Token);

//Export de la variable bot

bot.on('ready', () => {
	refresh(bot, "./cmd");
	console.log("Assist-o-bot est opérationnel.");
})

bot.on("interactionCreate", async (interaction) => {
	if (salons.includes(interaction.channelId)) {
		if(interaction.isCommand()){
			const { commandName } = interaction;
			const command = bot.commands.get(commandName);
			
			if (!command) return;
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
			}
		}
		else if(interaction.isSelectMenu()){
			switch(interaction.values.toString()){
				case "1": join(bot, interaction); break;
				case "2": break;
				case "3": break;
				case "4": break;
				case "5": break;
			}
		} else {
			await interaction.reply({content:"Interaction inconnue.", ephemeral:true})
		}
	}
})

