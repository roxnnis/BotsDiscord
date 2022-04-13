// BOT CONFIGURATION
// Contain Token
var { Token } = JSON.parse(require('fs').readFileSync("../../BotConfig.json"));

//fonctions pour les différents choix du menu déroulant
const { composition } = require("./functions/dropdown/composition.js");
const { join, isJoinButton } = require("./functions/dropdown/join.js");
const { members } = require("./functions/dropdown/members.js");
const { remove } = require("./functions/dropdown/remove.js");
const { roles } = require("./functions/dropdown/roles.js");

//Constantes & Variables
const { salons, serveurs } = require("./data/id.json");
const { refresh } = require("./slash.js");

//Setup Bot (Assist-o-Bot)
const { Client, Intents, Interaction } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.DIRECT_MESSAGES], });
bot.login(Token); // LOGIN DU BOT

// Démarrage du bot
bot.on('ready', () => {
	refresh(bot, "./cmd"); // Rafraîchissement des commandes slash
	console.log("Assist-o-bot est opérationnel."); //ACK
})

/* 
 * ========================
 * Listeners : Interactions
 * ========================
 */
bot.on("interactionCreate", async (interaction) => {
	if (salons.includes(interaction.channelId)) {
		if (interaction.isCommand()) {
			const { commandName } = interaction;
			const command = bot.commands.get(commandName);

			if (!command) return;
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
			}
		}
		else if (interaction.isSelectMenu()) {
			switch (interaction.values.toString()) {
				case "1":
					join(interaction);
					break;
				case "2": 
					remove(member);
					break;
				case "3": 
					members();
					break;
				case "4": 
					roles();
					break;
				case "5": 
					composition();
					break;
			}
		} else if (interaction.isButton()) {
			if(interaction.customId == 'lancer'){

			} else if (interaction.customId == 'annuler') {

			}
		} else {
			await interaction.reply({ content: "Interaction inconnue.", ephemeral: true })
		}
	}
})