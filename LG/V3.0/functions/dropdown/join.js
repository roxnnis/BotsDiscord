const { check } = require("../check.js");
const { MessageActionRow, MessageButton, Interaction, Collector, User } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const fs = require("fs");

/**
 * Permet de collecter les membres voulant rejoindre la partie
 * @param {Interaction} interaction L'interaction
 * @returns {Collector} Le collecteur sur le message
 */
exports.join = async function (interaction) {
	if (check(interaction, 2)) {
		const buttons = new MessageActionRow()
			//Rejoindre la partie
			.addComponents(
				new MessageButton()
					.setCustomId("join")
					.setLabel('Rejoindre la partie')
					.setStyle("SUCCESS")
			)
			//Quitter la partie
			.addComponents(
				new MessageButton()
					.setCustomId("leave")
					.setLabel('Quitter la partie')
					.setStyle("DANGER")
			)
			//Forcer la fin des inscriptions
			.addComponents(
				new MessageButton()
					.setCustomId("close")
					.setLabel('Fermer')
					.setStyle("SECONDARY")
			)
		// Message
		await interaction.reply({ content: "Bienvenue dans cette partie de Loup-Garou de thiercelieux !\n\n> Pour rejoindre la partie, vous pouvez appuyer sur le bouton vert.\n> Si jamais vous ne souhaitez plus participer, vous pouvez appuyer sur le bouton rouge.\n\nLe bouton gris sert au maître du jeu pour clôturer les inscriptions avant le temps limite (30s)", components: [buttons] })
			.then(() => {
				// Filtrer les interactions -> Uniquement celles de l'appui sur le bouton
				const filter = i => ['join', 'leave', 'close'].includes(i.customId);
				const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
				collector.on('collect', async i => {
					if (i.customId === 'join') {
						addMember(i.user);
						await interaction.channel.send(i.user + " a rejoint la partie.").then(async message => {
							await wait(1500);
							message.delete();
						});
					} else if (i.customId === 'leave') {
						await interaction.channel.send("LEAVE").then(async message => {
							await wait(1500);
							message.delete();
						});
					} else {
						await interaction.channel.send("END").then(async message => {
							await wait(1500);
							message.delete();
						});
					}
				});
				collector.on('end', async () => {
					await interaction.channel.send("FIN : Collection").then(async message => {
							await wait(2500);
							message.delete();
						});
					interaction.deleteReply();
				});
			})


	}
	else {
		await interaction.reply({ content: "Vous n'avez pas le droit de faire cette action.", ephemeral: true })
	}
};

/**
 * Détecte si l'interaction en paramètre est un bouton de 
 * @param {Interaction} interaction L'interaction
 * @returns {boolean} Le booléen de réponse
 */
exports.isJoinButton = function (interaction) {
	return ['join', 'leave', 'close'].includes(interaction.customId);
}

/** Ajoute un utilisateur à la liste des joueurs.
 * @param {User} user - L'utilisateur à ajouter
 */
function addMember (user) {
	var file = fs.readFileSync("data/config.json");
	var config = JSON.parse(file);
	if (!config['joueurs'].includes(user.id)){
		config['joueurs'].push(user.id);
		fs.writeFileSync("data/config.json", JSON.stringify(config));
	}
};

exports.removeMember = function () {

};

exports.endCollector = function (interaction) {
	interaction.message.delete();
};