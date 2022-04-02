//Requires
//File Search
const fs = require("fs");

//Lancement du bot
const Discord = require(`./bot/setup.js`);
var bot = Discord.botCreate(JSON.parse(fs.readFileSync(`./bot/BotConfig.json`)).Token);

//Salons Autorisés
const salonJDR = ["624474305018855449", "924276882898321449", "659811273848127488", "958799693847101530"];

//

//Récupérer les classes
const { Personnages } = require(`./classes/Personnages`);


//Rolistes (Registre de personnages)
var rolistes = JSON.parse(fs.readFileSync("./donnees/Personnages.json"));

//Écriture dans le JSON
fs.writeFileSync(`./donnees/Personnages.json`, JSON.stringify(rolistes));

//Commande en cours
bot.on("interactionCreate", async (interaction) => {
	if (salonJDR.includes(interaction.channelId)) {

		//
		if (interaction.isContextMenu()){
			
		}

		//Appuie sur un bouton
		if (interaction.isButton()) {

		}

		//Réception d'une commande (/)
		else if (!interaction.isCommand()) {

			const { commandName } = interaction;
			const command = bot.commands.get(commandName);
			
			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {

				console.log("CatchIntCreate - MAIN : Erreur sur " + commandName);

				if (interaction.options._subcommand == "info") {
					await interaction.reply({
						content: "Erreur : Le nom " + interaction.options._hoistedOptions[0].value + " n'est pas reconnu.",
						ephemeral: false
					})
				}
				else if (interaction.options._subcommand == "add") {
					console.log(error);
					await interaction.reply({
						content: "Erreur : Ajout.",
						ephemeral: false
					})
				} else {
					console.log(error);
				}
			}
		}


	} else {
		return interaction.reply(
			{
				content: "Vous n'avez pas le droit d'effectuer cette commande dans ce salon.",
				ephemeral: true
			}
		)
	}

});