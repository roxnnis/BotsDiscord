//requires
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Lance un dé")
		.addIntegerOption((option) => option.setName("nb").setDescription("Nombre de dé à lancer (entre 1 et 10 // Défaut : 1)").setRequired(false))
		.addIntegerOption((option) => option.setName("faces").setDescription("Nombre de faces sur le dé (entre 1 et 200 // Défaut : 100)").setRequired(false))
	, async execute(interaction){
		var NB_DES;
		var FACES;
		
		//Nombre de dés
		if(interaction.options.getInteger("nb") !== null && interaction.options.getInteger("nb") <= 10 && interaction.options.getInteger("nb") > 0){NB_DES = interaction.options.getInteger("nb")} else NB_DES = 1;
		//Nombre de faces
		if(interaction.options.getInteger("faces") !== null && interaction.options.getInteger("faces") <= 200 && interaction.options.getInteger("faces") > 0) {FACES = interaction.options.getInteger("faces") } else FACES = 100;

		var res = [];
		var total = 0;
		for(i = 0; i < NB_DES; i++){
			res[i] = Math.floor(Math.random() * FACES) + 1;
			total += res[i];
		}

		await interaction.reply(
			"Vous avez lancé " 
			+ NB_DES +
			(NB_DES == 1 ? " dé" : " dés") + " de " + FACES + (FACES == 1 ? " face" : " faces") + "\r\nVous avez fait **" + total + "**\r\n||Valeurs : " + res + "||")
	}
}