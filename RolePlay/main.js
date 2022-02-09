// BOT CONFIGURATION
// Contient le Jeton d'activation du Bot Discord.
const fs = require("fs");
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

//Requires
const Classes = require("./classes.js");
const Shop = require("./shop.js");

//SALON JDR
const salonJDR = ["624474305018855449"]

//#region Création de personnages
//Variables d'armes (pour aller plus vite)
Poulet = Shop.Shop.Armes["Revolver composite"];
KFC = Shop.Shop.Armes["Epée longue"];
Tenders = Shop.Shop.Armures["Toison de sniper"];
ConsoRandom = Shop.Shop.Consommables["Corde"];

//Persos
Roxnnis = new Classes.Personnage({
	Nom: "Roxnnis",
	LVL: 2,
	Money: 3827,
	Stats: new Classes.Stats({ phy: 5, men: 13, int: 14, soc: 4, cha: 5 }),
	Weapons: { Principale: Poulet, Auxiliaire: new Classes.Armes() },
	Armors: { Principale: Tenders },
	INV: {obj1: ConsoRandom, obj2: ConsoRandom}
});

Dexhort = new Classes.Personnage({
	Nom: "MJ",
	LVL: 96
});

Côtelette = new Classes.Personnage({
	Nom: "BeafSteak",
	LVL: 2,
	Money: 0,
	Stats: new Classes.Stats({ men: 13, int: 10, cha: 12 }),
	Weapons: { Principale: new Classes.Armes(), Auxiliaire: new Classes.Armes() },
	Armors: { Principale: new Classes.Armures() },
});
//console.log("47MA - ", Roxnnis);
//JSON lecture
const Pers = fs.readFileSync("./Personnages.json");
var rolistes = JSON.parse(Pers);

rolistes["Roxnnis"] = {
	Nom: Roxnnis.Nom,
	LVL: Roxnnis.LVL,
	Money: Roxnnis.Money,
	Weight: Roxnnis.Weight.Total,
	PV: Roxnnis.PV,
	Stats: Roxnnis.Stats,
	Weapons: Roxnnis.Weapons,
	Armors: Roxnnis.Armors,
	Inv: Roxnnis.Inv
};


rolistes["Dexhort"] = {
	Nom: Dexhort.Nom,
	LVL: Dexhort.LVL,
	Money: Dexhort.Money,
	Weight: Dexhort.Weight.Total,
	PV: Dexhort.PV,
	Stats: Dexhort.Stats,
	Weapons: Dexhort.Weapons,
	Armors: Dexhort.Armors,
	Inv: Dexhort.Inv
};

rolistes["Côtelette"] = {
	Nom: Côtelette.Nom,
	LVL: Côtelette.LVL,
	Money: Côtelette.Money,
	Weight: Côtelette.Weight.Total,
	PV: Côtelette.PV,
	Stats: Côtelette.Stats,
	Weapons: Côtelette.Weapons,
	Armors: Côtelette.Armors,
	Inv: Dexhort.Inv
};

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
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});
//#endregion