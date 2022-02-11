
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Collection } = require("discord.js");
const fs = require('fs');

/**
 * Enregistre les commandes créées dans le bot
 * @param dir - Chemin d'accès à un dossier sous forme de chaîne de caractères
 */
function refresh(bot, dir, token) {

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
	}

	const rest = new REST({ version: '9' }).setToken(token);

	(async () => {
		try {
			console.log('Rafraîchissement des commandes (/)...');
			guildId.forEach(async function (value) {
				await rest.put(
					Routes.applicationGuildCommands(clientId, value),
					{ body: commands },
				);
			})

			console.log('Les commandes (/) ont été rafraîchies');
		} catch (error) {
			console.error("Erreur de rafraîchissement : ", error);
		}
	})();
}

exports.refresh = refresh;