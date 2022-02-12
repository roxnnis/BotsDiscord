//Requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Document expliquant les commandes (utile)")
	, async execute(interaction) {

		embed = new MessageEmbed()
			.setColor("#0f52ba")
			.setTitle("**Jeu de Rôle - Commandes**")
			.setDescription("Toutes les commandes du JDR sont données ici ;D\r\n[] : Paramètre obligatoire\r\n<> : Paramètre optionnel")
			.addField("\u200b", "\u200b")
			.addFields(
				{
					"name": "__/personnage__ info [nom]",
					"value": "Affiche la fiche de personnage ",
					"inline": true
				},
				{
					"name": "__/shop__ [item / arme / armure] list [nomObjet / all] <nom>",
					"value": "Affiche la liste du magasin",
					"inline": true
				},
				{
					"name": "__/shop__ [item / arme / armure] buy [nom] <quantité>",
					"value": "Achète l'objet demandé (Quantité de fois)",
					"inline": true
				},
				{
					"name":"\u200b",
					"value":"\u200b"
				},
				{
					"name": "__/roll__ <nb> <maxDé>",
					"value": "Lance 'nb' dés de 'maxDé' faces (Défaut (sans param) : 1d100)",
					"inline": true
				},
				{
					"name": "__/help__",
					"value": "Affiche ce menu.",
					"inline": true
				});

		await interaction.reply({embeds : [embed]});
	}
}