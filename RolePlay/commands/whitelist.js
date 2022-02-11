//Requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
	//Commande principale 
	,
	async execute(interaction){
		if(1 == 1){
			console.log("Not implemented yet !");
		} else {
				await interaction.reply({
					content: "La commande n'a pas aboutie.",
					ephemeral: true,
				});
			}
	}
}