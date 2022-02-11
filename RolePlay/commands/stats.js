//Requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
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
			
			await interaction.reply({content:"La commande n'est pas encore disponible",ephemeral:true});
		}
}