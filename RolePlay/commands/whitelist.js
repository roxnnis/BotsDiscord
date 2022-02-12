//Requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const { WlAdd, WlDel } = require("./fonctions/editWhitelist");

//Permisssions Admin
const ADMIN = "185352234580574208";

module.exports = {
	data: new SlashCommandBuilder()
		//Commande principale
		.setName("whitelist")
		.setDescription("Tri des 'Polluants'...")
		.addSubcommand(subcommand =>
			subcommand
				.setName("add")
				.setDescription("Admin : Ajouter une personne à la whitelist")
				.addUserOption((option) => option.setName("user").setDescription("Utilisateur à ajouter à la whitelist").setRequired(true))
				.addStringOption((option) => option.setName("perso").setDescription("Personnage que possède l'utilisateur").setRequired(false))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("del")
				.setDescription("Admin : Retirer une personne à la whitelist.")
				.addUserOption((option) => option.setName("user").setDescription("Utilisateur à retirer à la whitelist").setRequired(true))
				.addStringOption((option) => option.setName('perso').setDescription("Personnage que possède l'utilisateur"))
		)
	,
	async execute(interaction) {
		if (interaction.user.id == ADMIN) {
			const USER = interaction.options.getUser("user");
		const NAME = interaction.options.getString("perso");

		if (interaction.options._subcommand == "add") {
			//Fonction d'ajout
			WlAdd(USER.id, NAME);
			if (interaction.options.getString("perso") !== null)
				await interaction.reply("L'ajout de " + NAME + " à la whitelist a été réalisé !");
			else
				await interaction.reply("L'ajout des personnages de " + USER.username + " à la whitelist a été réalisé !");
		} else if (interaction.options._subcommand == "del") {
			//Fonction de retrait
			WlDel(USER.id, NAME);
			if (interaction.options.getString("perso") !== null) {
				await interaction.reply("La personne " + USER.username + " vient de voir son personnage " + NAME + " retiré de la whiteliste !");
			} else {
				await interaction.reply("La personne " + USER.username + " s'est faite retiré de la whitelist !");
			}
		}
		} else {
			await interaction.reply("Vous n'avez pas accès à cette commande !")
		}
	}
}