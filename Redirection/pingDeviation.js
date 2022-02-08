// BOT CONFIGURATION
// Contain Token
const fs = require('fs');
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

const { Client, Intents, MessageAttachment } = require("discord.js");
const bot = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_PRESENCES,
	],
});

bot.login(SettBot.Token);

const salonsAnnonces = ["923893129680154625","923893151385661460"]; //Salons d'annonces
const blacklistBots = ["282286160494067712", "601836762008125460"] //Bots dont le message n'est pas supprimé par l'Assist-o-bot


bot.on("messageCreate", (message) => {
	if (!salonsAnnonces.includes(message.channelId) || blacklistBots.includes(message.author.id)) return;
	message.delete();

	setTimeout(() => {
		try{
		if (message.attachments.size !== 0) {
			var contentMessage = "\r\n";
			message.attachments.forEach((v, k, m) => (
				contentMessage += v.proxyURL + "\r\n"
			))
			message.channel.send("<@&922062592225210370> " + message.content + contentMessage);
		} else {
			message.channel.send("<@&922062592225210370> " + message.content);
		}} catch(err) {
			if(err == "DiscordAPIError: Unknown Message" || err == "Unknown Message"){
				console.log("PATH IF")
				message.guild.channels.cache.get("767002045558947850").send("Une erreur est survenu lors du ping dans un salon de Neyyl... J'ai pas encore crash... J'espère... J'aime ma vie...");
			} else {
				console.log("PATH ELSE")
				message.guild.channels.cache.get("767002045558947850").send("Une erreur est survenu lors du ping dans un salon de Neyyl... J'ai pas encore crash... J'espère... J'aime ma vie...");
			}
		}
	}, 500)
})