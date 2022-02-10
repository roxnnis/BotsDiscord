const { SlashCommandBuilder } = require("@discordjs/builders");

//Personnages
const fs = require("fs");
var Pers = fs.readFileSync("./Personnages.json");
const Classes = require("../classes.js");


module.exports = {
	data: new SlashCommandBuilder()
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
		)//ok c'est bon merci
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
			if (interaction.options._group == "item" && interaction.options._subcommand == "add") {
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
				/* interaction.options.getInteger("qtty") != null ? tempo.Objet["Quantity"] = 1 :  */
				/*if(interaction.options.getInteger("qtty") != null){
					tempo.Objet["Quantity"] = 1;
				} else {
					tempo.Objet["Quantity"] = interaction.options.getInteger("qtty");
				}*/
				/*		
						Quality: interaction.options.getString("qaly"),
						Description: interaction.options.getString("desc")*/
				console.log(tempo);
				boutique.shop.ShopObjet = tempo;
				fs.writeFileSync("Shop.json", JSON.stringify(boutique));
				await interaction.reply("Item créé");
			}
		}

	}
}