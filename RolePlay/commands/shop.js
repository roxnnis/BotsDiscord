const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

//Personnages
const fs = require("fs");
var Pers = fs.readFileSync("./Personnages.json");
const Classes = require("../classes.js");


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
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'objet / All pour tout afficher").setRequired(true))
				)
		)//ok c'est bon merci
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
						embed = new MessageEmbed()
						.setColor("AQUA")
						.setTitle("Boutique de consommable")
						.addField("\u200b", "\u200b");
						
						EmbObjet = "";
						if(Object.keys(boutique.shop["ShopObjet"]).length != 0)
						{
							for(var key in boutique.shop["ShopObjet"])
							{
								EmbObjet +=
									boutique.shop["ShopObjet"][key].Objet.Nom +
									"   Prix: " +
									boutique.shop["ShopObjet"][key].Prix +
									"\r\n"
							}
						} else {
							EmbObjet = "Rien en boutique aujourd'hui";
						}
						embed.addField("Consommable",EmbObjet);
						await interaction.reply({embeds: [embed]});
					}
				}
			}
		}

	}
}