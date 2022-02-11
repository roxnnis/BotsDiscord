//Instanciation du Bot et déclatations des pré-requis de la librairie "Discord.js"
const { Client, Intents } = require("discord.js");
const COMMANDES_SLASH = require("./slash.js");

//Obtenir un bot
function botCreate(Token) {
	//Création du bot
	var bot = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MEMBERS,
			Intents.FLAGS.GUILD_PRESENCES,
			Intents.FLAGS.DIRECT_MESSAGES,
		],
	});
	//Connexion du bot
	bot.login(Token);

	

	//Rafraîchissement des commandes (/)
	bot.on('ready', () => {
		COMMANDES_SLASH.refresh(bot, `${process.cwd()}/commands`, Token);
		console.log("Assist-o-bot est opérationnel.");
	})
	return bot;
}

exports.botCreate = botCreate;