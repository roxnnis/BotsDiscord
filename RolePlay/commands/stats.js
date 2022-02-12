//Requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");


//Récupération des permissions
const ADMIN = "185352234580574208";

module.exports = {
	data: new SlashCommandBuilder()
		//Commande principale STATS
		.setName("stats")
		.setDescription("Admin : Modifier une caractéristique")
			.addStringOption((option) => option.setName("perso").setDescription("Personnage à modifier la statistique").setRequired(true))
			.addIntegerOption((option) => option.setName("level").setDescription("Changer le niveau d'un personnage").setRequired(false))
			.addIntegerOption((option) => option.setName("vital").setDescription("Modifier les points de vie d'un personnage").setRequired(false))
			.addIntegerOption((option) => option.setName("pvmax").setDescription("Modifier les points de vie max d'un personnage").setRequired(false))
			.addIntegerOption((option) => option.setName("money").setDescription("Toucher aux bourses d'un personnage").setRequired(false))
			.addIntegerOption((option) => option.setName("physi").setDescription("PHY = ??").setRequired(false))
			.addIntegerOption((option) => option.setName("menta").setDescription("MEN = ??").setRequired(false))
			.addIntegerOption((option) => option.setName("intel").setDescription("INT = ??").setRequired(false))
			.addIntegerOption((option) => option.setName("socia").setDescription("SCL = ??").setRequired(false))
			.addIntegerOption((option) => option.setName("chate").setDescription("CHA = ??").setRequired(false))
		, async execute(interaction) {
			if (interaction.user.id == ADMIN) {
				var rolistes = JSON.parse(fs.readFileSync("./donnees/Personnages.json"));

				if (interaction.options.getInteger("level") != null) rolistes[interaction.options.getString("perso")].LVL = interaction.options.getInteger("level");
				if (interaction.options.getInteger("vital") != null) rolistes[interaction.options.getString("perso")].PV.Actuel = interaction.options.getInteger("vital");
				if (interaction.options.getInteger("pvmax") != null) rolistes[interaction.options.getString("perso")].PV.Total = interaction.options.getInteger("pvmax");
				if (interaction.options.getInteger("money") != null) rolistes[interaction.options.getString("perso")].Money += interaction.options.getInteger("money");
				if (interaction.options.getInteger("physi") != null) rolistes[interaction.options.getString("perso")].Stats.PHY = interaction.options.getInteger("physi");
				if (interaction.options.getInteger("menta") != null) rolistes[interaction.options.getString("perso")].Stats.MEN = interaction.options.getInteger("menta");
				if (interaction.options.getInteger("intel") != null) rolistes[interaction.options.getString("perso")].Stats.INT = interaction.options.getInteger("intel");
				if (interaction.options.getInteger("socia") != null) rolistes[interaction.options.getString("perso")].Stats.SOC = interaction.options.getInteger("socia");
				if (interaction.options.getInteger("chate") != null) rolistes[interaction.options.getString("perso")].Stats.CHA = interaction.options.getInteger("chate");

				if(rolistes[interaction.options.getString("perso")].PV.Actuel > rolistes[interaction.options.getString("perso")].PV.Total) {
					rolistes[interaction.options.getString("perso")].PV.Actuel = rolistes[interaction.options.getString("perso")].PV.Total
				}

				fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
				await interaction.reply("Les statistiques ont été modifiées !");
			} else {
				await interaction.reply({ content: "Vous n'avez pas accès à cette commande", ephemeral: true });
			}
		}
}