const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Token } = require('../../BotConfig.json');
const fs = require('fs');
const { Collection } = require("discord.js");

/**
 * Enregistre les commandes créées dans le bot
 * @param dir - Chemin d'accès à un dossier sous forme de chaîne de caractères
 */
exports.refresh = function (bot, dir) {
	bot.commands = new Collection();
	const commands = [];
	const commandFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js'));

	// Bot / Guild ID
	const clientId = '601836762008125460';
	const guildId = ['342722397570465802', "659767673898663948"];

	for (const file of commandFiles) {
		const command = require(`${dir}/${file}`);
		bot.commands.set(command.data.name, command);
		commands.push(command.data.toJSON());
		console.log("La commande \"" + command.data.name + "\" a été trouvée.");
	}
	console.log() //Espacement :D

	const rest = new REST({ version: '9' }).setToken(Token);

	(async () => {
		try {
			console.log('Rafraîchissement des commandes (/)...');
			guildId.forEach(async function (value) {
				await rest.put(
					Routes.applicationGuildCommands(clientId, value),
					{ body: commands }
				);
			})
			console.log('Les commandes (/) ont été rafraîchies');
		} catch (error) {
			console.error("Erreur de rafraîchissement : ", error);
		}
	})();
}