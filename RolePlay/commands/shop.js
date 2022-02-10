const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

//Personnages
const fs = require("fs");
var Pers = fs.readFileSync("./Personnages.json");
const Classes = require("../classes.js");
const Spl = require("./fonctions/shopList.js");


module.exports = {
	data: new SlashCommandBuilder()
		//#region command setup
		//Comande principal Shop
		.setName("shop")
		.setDescription("Actions sur le shop")
		.addSubcommandGroup(subcommandgroup =>
			subcommandgroup
				.setName("item")
				.setDescription("Ouvre le shop des consommables")
				// shop >> item
				.addSubcommand(subcommand =>
					subcommand
						.setName("add")
						.setDescription("Ajoute un objet")
						// shop >> item >> add >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'objet").setRequired(true))
						.addIntegerOption((option) => option.setName("pods").setDescription("Poid de L'objet dans l'inventaire").setRequired(true))
						.addIntegerOption((option) => option.setName("prix").setDescription("Prix de l'objet").setRequired(true))
						.addBooleanOption((option) => option.setName("stac").setDescription("L'objet est stackable ou non").setRequired(false))
						.addIntegerOption((option) => option.setName("qtty").setDescription("Quantité d'objet dans le lot").setRequired(false))
						.addIntegerOption((option) => option.setName("rest").setDescription("Nombre d'utilisation de l'objet").setRequired(false))
						.addStringOption((option) => option.setName("unit").setDescription("Unité de l'utilisation de l'objet").setRequired(false))
						.addStringOption((option) => option.setName("qaly").setDescription("Qualité de l'objet").setRequired(false))
						.addStringOption((option) => option.setName("desc").setDescription("description de l'objet").setRequired(false))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("list")
						.setDescription("Afficher le contenu de la boutique de consomable")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'objet. *all* pour tout afficher").setRequired(true))
				)
		)
		.addSubcommandGroup(subcommandgroup =>
			subcommandgroup
				.setName("arme")
				.setDescription("Ouvre le shop d'armes")
				// shop >> item
				.addSubcommand(subcommand =>
					subcommand
						.setName("add")
						.setDescription("Ajoute une arme")
						// shop >> item >> add >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'arme").setRequired(true))
						.addStringOption((option) => option.setName("type").setDescription("Type de l'arme").setRequired(true))
						.addIntegerOption((option) => option.setName("main").setDescription("Nombre de main utilisé").setRequired(true))
						.addIntegerOption((option) => option.setName("pods").setDescription("Poid de l'arme").setRequired(true))
						.addIntegerOption((option) => option.setName("dega").setDescription("Dégat de l'arme").setRequired(true))
						.addIntegerOption((option) => option.setName("prec").setDescription("Précision de l'arme").setRequired(true))
						.addIntegerOption((option) => option.setName("prix").setDescription("Prix de l'arme").setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("list")
						.setDescription("Afficher le contenu de la forge d'arme")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'arme. *all* pour tout afficher").setRequired(true))
				)
		)
		.addSubcommandGroup(subcommandgroup =>
			subcommandgroup
				.setName("armure")
				.setDescription("Ouvre le shop d'armure")
				// shop >> item
				.addSubcommand(subcommand =>
					subcommand
						.setName("add")
						.setDescription("Ajoute une armure")
						// shop >> item >> add >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'armure").setRequired(true))
						.addStringOption((option) => option.setName("type").setDescription("Type de l'armure").setRequired(true))
						.addIntegerOption((option) => option.setName("pods").setDescription("Poid de l'armure").setRequired(true))
						.addIntegerOption((option) => option.setName("prix").setDescription("Prix de l'armure").setRequired(true))
						.addIntegerOption((option) => option.setName("rphy").setDescription("Resistance physique de l'armure").setRequired(true))
						.addIntegerOption((option) => option.setName("rmen").setDescription("Resistance mental de l'armure").setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("list")
						.setDescription("Afficher le contenu de l'armurerie")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'objet / All pour tout afficher").setRequired(true))
				)
		)
		//#endregion
	,
	async execute(interaction) {
		if (interaction.commandName == "shop") {
			var shp = fs.readFileSync("Shop.json");
			var boutique = JSON.parse(shp);

			var pers = fs.readFileSync("Personnages.json");
			var rolistes = JSON.parse(pers);

			//Tester si le paramètre est donné ou non
			function isNull(input, out) {
				return input != null ? input : out;
			}
			//Shop >> Item
			if (interaction.options._group == "item") {
				//Shop >> Item >> Add >> options
				if(interaction.options._subcommand == "add")
				{
					var tempo = {
						Objet: {
							Nom: interaction.options.getString("nom"),
							Weight: interaction.options.getInteger("pods"),
							Quantity: isNull(interaction.options.getInteger("qtty"), 1),
							Stackable: isNull(interaction.options.getBoolean("stac"), false)
						},
						Prix: interaction.options.getInteger("prix")
					};
					if(isNull(interaction.options.getInteger("rest"),false))
					{
						tempo.Objet["Remain"] = interaction.options.getInteger("rest");
						if(isNull(interaction.options.getString("unit"),false))
						{
							tempo.Objet["Unity"] = interaction.options.getString("unit");
						}
					}

					boutique.shop["ShopObjet"][tempo.Objet.Nom] = {
						Objet: tempo.Objet,
						Prix: tempo.Prix
					}
					
					fs.writeFileSync("Shop.json", JSON.stringify(boutique));
					await interaction.reply("Item créé");
				}
				else if(interaction.options._subcommand == "list"){
					if(interaction.options.getString("nom").toLowerCase() == "all")
					{
						await interaction.reply({embeds: [Spl.ShopListObjet(boutique,"all")]});
					}
					else{
						await interaction.reply({embeds: [Spl.ShopListObjet(boutique,interaction.options.getString("nom"))]});
					}
				}
			}
			else if (interaction.options._group == "arme") {
				//Shop >> Item >> Add >> options
				if(interaction.options._subcommand == "add")
				{
					var tempo = {
						Objet: {
							Nom: interaction.options.getString("nom"),
							Type: interaction.options.getString("type"),
							Hand: interaction.options.getInteger("main"),
							Weight: interaction.options.getInteger("pods"),
							Damage: interaction.options.getInteger("dega"),
							Precision: interaction.options.getInteger("prec"),
						},
						Prix: interaction.options.getInteger("prix")
					};
					if (["Arc", "Fusil", "Pistolet"].includes(tempo.Objet.Type)) {
						switch (tempo.Objet.Type) {
							case "Arc":
								tempo.Objet.Munitions = { Chargeur: 1, Reserve: 30, Recharge: 1 };
								break; //Arcs, ...
							case "Fusil":
								tempo.Objet.Munitions = { Chargeur: 1, Reserve: 20, Recharge: 1 };
								break; //Fusils, ...
							case "Pistolet":
								tempo.Objet.Munitions = { Chargeur: 6, Reserve: 30, Recharge: 1 };
								break; //Revolvers, Pistolets, ...
							default:
								tempo.Objet.Munitions = { Chargeur: 0, Reserve: 0, Recharge: 1 };
								break;
						}
					}

					boutique.shop["ShopArmes"][tempo.Objet.Nom] = {
						Objet: tempo.Objet,
						Prix: tempo.Prix
					}
					
					fs.writeFileSync("Shop.json", JSON.stringify(boutique));
					await interaction.reply("Arme créé");
				}
				else if(interaction.options._subcommand == "list"){
					if(interaction.options.getString("nom").toLowerCase() == "all")
					{
						await interaction.reply({embeds: [Spl.ShopListArme(boutique,"all")]});
					}
					else{
						await interaction.reply({embeds: [Spl.ShopListArme(boutique,interaction.options.getString("nom"))]});
					}
				}
			}
			else if (interaction.options._group == "armure") {
				//Shop >> Item >> Add >> options
				if(interaction.options._subcommand == "add")
				{
					var tempo = {
						Objet: {
							Nom: interaction.options.getString("nom"),
							Type: interaction.options.getString("type"),
							Weight: interaction.options.getInteger("pods"),
							Res: { PHY: interaction.options.getInteger("rphy"), MEN: interaction.options.getInteger("rmen")},
						},
						Prix: interaction.options.getInteger("prix")
					};

					boutique.shop["ShopArmures"][tempo.Objet.Nom] = {
						Objet: tempo.Objet,
						Prix: tempo.Prix
					}
					
					fs.writeFileSync("Shop.json", JSON.stringify(boutique));
					await interaction.reply("Armure créé");
				}
				else if(interaction.options._subcommand == "list"){
					if(interaction.options.getString("nom").toLowerCase() == "all")
					{
						await interaction.reply({embeds: [Spl.ShopListArmure(boutique,"all")]});
					}
					else{
						await interaction.reply({embeds: [Spl.ShopListArmure(boutique,interaction.options.getString("nom"))]});
					}
				}
			}
		}

	}
}