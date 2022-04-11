const { check } = require("../check.js");
const { MessageActionRow, MessageButton, Interaction, Collector } = require("discord.js");

/**
 * Permet de collecter les membres voulant rejoindre la partie
 * @param {Interaction} interaction L'interaction
 * @returns {Collector} Le collecteur sur le message
 */
exports.join = async function (interaction){
	if(check(interaction,2)) {
		const buttons = new MessageActionRow()
			//Rejoindre la partie
			.addComponents(
				new MessageButton()
					.setCustomId("join")
					.setLabel('Rejoindre la partie')
					.setStyle("SUCCESS")
			//Quitter la partie
			).addComponents(
				new MessageButton()
					.setCustomId("leave")
					.setLabel('Quitter la partie')
					.setStyle("DANGER")
			//Forcer la fin des inscriptions
			).addComponents(
				new MessageButton()
					.setCustomId("close")
					.setLabel('Fermer')
					.setStyle("SECONDARY")
			)
		await interaction.reply({content:"Bienvenue dans cette partie de Loup-Garou de thiercelieux !\n\n> Pour rejoindre la partie, vous pouvez appuyer sur le bouton vert.\n> Si jamais vous ne souhaitez plus participer, vous pouvez appuyer sur le bouton rouge.\n\nLe bouton gris sert au maître du jeu pour clôturer les inscriptions avant le temps limite (30s)", components : [buttons]}).then(() =>{
			const filter = i => i.customId === 'join';
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
			return collector;
		});
		
	}
	else {
		await interaction.reply({content:"Vous n'avez pas le droit de faire cette action.",ephemeral:true})
	}
};

exports.add = async function (collector) {
collector.on('collect', async i => {
	if (i.customId === 'join') {
		/* Ajouter le joueur dans la liste des joueurs */
	}
});
}

collector.on('end', async () => {
	interaction.message.delete();
});