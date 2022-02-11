const { SlashCommandBuilder } = require("@discordjs/builders");

//Personnages
const fs = require("fs");
var Pers = fs.readFileSync("./Personnages.json");
const PInf = require(`${process.cwd()}/commands/fonctions/personnageInfo.js`);
const PAdd = require(`${process.cwd()}/commands/fonctions/personnageAdd.js`);

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
				.addStringOption((option) => option.setName("nom").setDescription("Préciser le nom du personnage").setRequired(true))
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
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("dcm")
				.setDescription("Changer le DCM d'un joueur")
				//Perso >> dcm >> Options
				.addStringOption((option) => option.setName("nom").setDescription("Nom du personnage").setRequired(true))
				.addStringOption((option) => option.setName("dcm").setDescription("Nom du nouveau DCM").setRequired(true))
			//Perso >> item >> add >> options
			//Perso >> item >> del >> options
		),
	async execute(interaction) {

		if (interaction.commandName == "personnage") {
			var Pers = fs.readFileSync("Personnages.json");
			var rolistes = JSON.parse(Pers);

			//INFORMATIONS DU PERSONNAGE
			if (interaction.options._subcommand == "info") {
				NomDonne = interaction.options.getString("nom"); //Requête par nom
				await interaction.reply({ embeds: [PInf.PersoInfo(rolistes)] });
			}
			//AJOUTER UN PERSONNAGE
			else if (interaction.options._subcommand == "add") {
				if (interaction.user.id == "185352234580574208") {
					PAdd.PersoAdd(rolistes, interaction);
					await interaction.reply("Votre personnage vient d'être créé.");
				} else {
					await interaction.reply({ content: "Vous n'avez pas les droits d'ajouter un personnage.", ephemeral: true });
				}
			}
			//CHANGER LE DCM
			else if (interaction.options._subcommand == "dcm" && interaction.user.id == "185352234580574208") {
				NomDonne = interaction.options.getString("nom");
				rolistes[NomDonne].Dcm = interaction.options.getString("dcm");
				fs.writeFileSync("Personnages.json", JSON.stringify(rolistes));
				await interaction.reply("Votre DCM vient d'être modifié.");
				//Personnage dcm set
			} else {
				await interaction.reply({
					content: "La commande n'a pas aboutie.",
					ephemeral: true,
				});
			}
		}
	}
};