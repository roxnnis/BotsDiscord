const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

//Personnages
const fs = require("fs");
var Pers = fs.readFileSync("./Personnages.json");
const Classes = require("../classes.js");
const PInf = require("./fonctions/personnageInfo.js");

module.exports = {
	data: new SlashCommandBuilder()
		//Commande principale PERSO
		.setName("personnage")
		.setDescription("Actions sur un personnage")

		//Perso >> Info
		.addSubcommand(subcommand =>
			subcommand
				.setName("info")
				.setDescription("Afficher la fiche d'un personnage")
				//Perso >> Info >> Options
				.addStringOption((option) =>option.setName("nom").setDescription("Préciser le nom du personnage").setRequired(true))
		)
		
		//Perso >> Add
		.addSubcommand(subcommand =>
			subcommand
				.setName("add")
				.setDescription("Créer un personnage")
				//Perso >> Add >> Options
				.addStringOption((option) => option.setName("nom").setDescription("Nom du personnage").setRequired(true))
				.addIntegerOption((option) => option.setName("phy").setDescription("Physique du personnage").setRequired(true))
				.addIntegerOption((option) => option.setName("men").setDescription("Mental du personnage").setRequired(true))
				.addIntegerOption((option) => option.setName("int").setDescription("Intelligence du personnage").setRequired(true))
				.addIntegerOption((option) => option.setName("soc").setDescription("Social du personnage").setRequired(true))
				.addIntegerOption((option) => option.setName("cha").setDescription("Chance du personnage").setRequired(true))
			),

	data2: new SlashCommandBuilder()
		//Commande principale STATS
		.setName("stats")
		.setDescription("Modifier une statistique")

		//Stats >> PV
		.addIntegerOption((option) => option.setName("pv").setDescription("Modifier le nombre de point de vie d'un personnage").setRequired(true))
		.addStringOption((option) =>option.setName("nom").setDescription("Cible de la modification").setRequired(true)
		),
	async execute(interaction) {
		
		var rolistes = JSON.parse(Pers); //Base JSON

		if (interaction.commandName == "personnage") {

			//INFORMATIONS DU PERSONNAGE
			if (interaction.options._subcommand == "info") {
				NomDonne = interaction.options.getString("nom"); //Requête par nom 
				await interaction.reply({ embeds: [PInf.PersoInfo(rolistes)] });
			
			//AJOUTER UN PERSONNAGE
			} else if (interaction.options._subcommand == "add") {
				tempo = new Classes.Personnage({
					Nom: interaction.options.getString("nom"),
					Stats: new Classes.Stats({ phy: interaction.options.getInteger("phy"), men: interaction.options.getInteger("men"), int: interaction.options.getInteger("int"), soc: interaction.options.getInteger("soc"), cha: interaction.options.getInteger("cha") }),
				});
				
				rolistes[tempo.Nom] = {
					Nom: tempo.Nom,
					LVL: tempo.LVL,
					Money: tempo.Money,
					Weight: tempo.Weight.Total,
					PV: tempo.PV,
					Stats: tempo.Stats,
					Weapons: tempo.Weapons,
					Armors: tempo.Armors,
					Inv: tempo.Inv
				};
			}
		} else if (interaction.commandName == "stats") {
			await interaction.reply("Votre personnage vient d'être créé.");
		}
		else {
			await interaction.reply({
				content: "Le joueur choisi n'a pas été trouvé (Recherche par Nom).",
				ephemeral: true,
			});
		}
	}
};
