//Requires
	//File Search
	const fs = require("fs");

//Lancement du bot
	const Discord = require(`./bot/setup.js`);
	var bot = Discord.botCreate(JSON.parse(fs.readFileSync(`./bot/BotConfig.json`)).Token);

//Salons Autorisés
	const salonJDR = ["624474305018855449","924276882898321449"];

//Récupérer les classes
const { Personnages } = require(`./classes/Personnages`);


//Paramètre de test --------------------------------
var Dexhort = new Personnages({Nom: "MJ",LVL: 96});
//--------------------------------------------------


//Rolistes (Registre de personnages)
var rolistes = JSON.parse(fs.readFileSync("./donnees/Personnages.json"));
console.log("23Main - ", rolistes);

//Écriture dans le JSON
fs.writeFileSync(`./donnees/Personnages.json`, JSON.stringify(rolistes));



//
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
			console.log(error);
			await interaction.reply({
				content: "Erreur : Ajout.",
				ephemeral: false
			})
		}
	}
});