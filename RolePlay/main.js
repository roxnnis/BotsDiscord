// BOT CONFIGURATION
// Contient le Jeton d'activation du Bot Discord.
const fs = require("fs");
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

//Requires
const Classes = require("./classes.js");
const Shop = require("./shop.js");

//SALON JDR
const salonJDR = ["624474305018855449","924276882898321449"];

//#region Création de personnages
//Variables d'armes (pour aller plus vite)
Poulet = Shop.Shop.Armes["Revolver composite"];
KFC = Shop.Shop.Armes["Epée longue"];
Tenders = Shop.Shop.Armures["Toison de sniper"];
ConsoRandom = Shop.Shop.Consommables["Corde"];

//Persos
Dexhort = new Classes.Personnage({Nom: "MJ",LVL: 96});
//console.log("47MA - ", Roxnnis);
//JSON lecture
const Pers = fs.readFileSync("./Personnages.json");
var rolistes = JSON.parse(Pers);

//Écriture dans JSON
fs.writeFileSync("Personnages.json", JSON.stringify(rolistes));

//#endregion

//#region Déclaration du bot
const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const bot = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
});

//Autorisation
const permissions = [{id: '185352234580574208',type: 'USER',permission: true,},{id: '659767673898663948',type: 'ROLE',permission: false}];

//Intégrer les commandes
bot.commands = new Collection();
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	bot.commands.set(command.data.name, command);
	bot.commands.permissions.set({permissions});
}

//Connexion du Bot
bot.login(SettBot.Token);
//#endregion

//#region Commandes du Bot
bot.on("interactionCreate", async (interaction) => {

	if (!interaction.isCommand() || !salonJDR.includes(interaction.channelId))
		return interaction.reply(
			{
				content: "Vous n'avez pas le droit d'effectuer cette commande dans ce salon.",
				ephemeral: true
			}
		);

	const { commandName } = interaction;
	const command = bot.commands.get(commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		if (interaction.options._subcommand == "info") {
			await interaction.reply({
				content: "Erreur : Le nom "+ interaction.options._hoistedOptions[0].value + " n'est pas reconnu.",
				ephemeral: false
			})
		}
		else if (interaction.options._subcommand == "add") {
			await interaction.reply({
				content: "Erreur : Ajout.",
				ephemeral: false
			})
		}
	}
});
//#endregion