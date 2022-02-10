const { SlashCommandBuilder } = require("@discordjs/builders");

//Personnages
const fs = require("fs");
var Pers = fs.readFileSync("./Personnages.json");
const PInf = require("./fonctions/personnageInfo.js");
const PAdd = require("./fonctions/personnageAdd.js");

module.exports = {
data: new SlashCommandBuilder()
		//Commande principale STATS
		.setName("stats")
		.setDescription("Modifier une statistique")

		//Stats >> PV
		.addIntegerOption((option) => option.setName("pv").setDescription("Modifier le nombre de point de vie d'un personnage").setRequired(true))
		.addStringOption((option) => option.setName("nom").setDescription("Cible de la modification").setRequired(true)
		), async execute(interaction){
			if (interaction.commandName == "stats") {
				await interaction.reply("La statistique vient d'être modifiée.");
			}
		}
}