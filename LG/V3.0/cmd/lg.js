//requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js");

module.exports = {
	//Commande : Démarrer une partie de Loup-Garou
	data: new SlashCommandBuilder()
		.setName("lg")
		.setDescription("Créer une partie de Loup-Garou")
	, async execute(interaction) {
		// if (interaction.channel.id == "962786072121737296") {
			//Création d'un message "Embed"
			const menu = new MessageEmbed()
				.setColor('#ffac9c') //Choisi par Yami
				//{ name: 'Assist-o-bot'/*, iconURL: '' <- P'tet mettre le lien du GitHub */ }
				.setAuthor("Roxnnis")
				.setTitle('Loup-Garou de Thiercelieux')
				.setDescription("Création d'une partie de Loup-Garou")
				/*.setThumbnail('') <- Rajouter une image de loup si j'en ai envie */
				.addFields(
					{ name: "Rejoindre", value: "Permet d'ouvrir les inscriptions à la partie.", inline: true },
					{ name: "Retirer", value: "Retire un joueur de la partie.", inline: true },
					{ name: "Membres", value: "Affiche la liste des participants.", inline: true },
					{ name: "Rôles", value: "Affiche la liste des rôles.", inline: true },
					{ name: "Composition", value: "Permet d'éditer la composition de la partie.", inline: true },
				)
				//{ text: 'Bot créé par Roxnnis' /*iconURL: ''*/ }
				.setFooter('Bot créé par Roxnnis');
			const choix = new MessageActionRow()
				.addComponents(
					new MessageSelectMenu()
						.setCustomId('choix')
						.setPlaceholder("Faites votre choix parmi la liste :D")
						.addOptions([
							{ label: 'Rejoindre', description: "Permet d'ouvrir les inscriptions à la partie.", value: "1" },
							{ label: 'Retirer', description: "Retire un joueur de la partie.", value: "2" },
							{ label: 'Membres', description: "Affiche la liste des participants.", value: "3" },
							{ label: 'Rôles', description: "Affiche la liste des rôles.", value: "4" },
							{ label: 'Composition', description: "Permet d'éditer la composition de la partie.", value: "5" },
						])
				);
			const buttons = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId("lancer")
						.setLabel('Lancer la partie')
						.setStyle("SUCCESS")
				)
				.addComponents(
					new MessageButton()
					.setCustomId("annuler")
					.setLabel('Annuler la partie')
					.setStyle("DANGER")
				)
			await interaction.reply({embeds: [menu], components: [choix,buttons] });

		}
	// }
} 