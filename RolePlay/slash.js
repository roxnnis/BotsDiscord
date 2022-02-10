const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Token } = require('../BotConfig.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Bot / Guild ID
const clientId = '601836762008125460';
const guildId = ['342722397570465802',"659767673898663948"];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	commands.push(command.data2.toJSON());
}
/* 
	Vers 12h10 je devrai couper la liaison (retour chez moi)
	à moins que je trouve comment garder mon pc allumé même fermé :D

	ok tkt, de toute manière je peux pas faire de test parce que t'as les perms qui font du caca
	en vrai je coupe, tu me ping quand t'as relancé et que tu peux bosser un minimum dessus

	Bah je prends mon train vers 17hXX donc je risque de couper un peu avant, mais dès que je suis rentré c'est good :D

	Bon bah on fait comme ça, moi je me remets sur mon taf de cours et tu me dis quand on peut bosser

	Faut manger monsieur hein xD

	non. Aller hop j'y vais, a toute à l'heure

	Aled... xD
*/
const rest = new REST({ version: '9' }).setToken(Token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		guildId.forEach(async function (value) {
			await rest.put(
			Routes.applicationGuildCommands(clientId, value),
			{ body: commands },
		);
		})

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
