const { SlashCommandBuilder } = require("@discordjs/builders");

//Personnages
const fs = require("fs");
var Pers = fs.readFileSync("./Personnages.json");
const PInf = require("./fonctions/personnageInfo.js");
const PAdd = require("./fonctions/personnageAdd.js");

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
            .addIntegerOption((option) => option.setName("poid").setDescription("Poid de L'objet dans l'inventaire").setRequired(true))
            .addBooleanOption((option) => option.setName("stack").setDescription("L'objet est stackable ou non").setRequired(false))
            .addIntegerOption((option) => option.setName("qnty").setDescription("Quantité d'objet dans le lot").setRequired(false))
            .addIntegerOption((option) => option.setName("rest").setDescription("Nombre d'utilisation de l'objet").setRequired(false))
            .addStringOption((option) => option.setName("unit").setDescription("Unité de l'utilisation de l'objet").setRequired(false))
            .addStringOption((option) => option.setName("qaly").setDescription("Qualité de l'objet").setRequired(false))
            .addStringOption((option) => option.setName("desc").setDescription("description de l'objet").setRequired(false))
            )
        )//ok c'est bon merci
		// ta fais quoi comme connerie ?
    ,
	async execute(interaction){
        if(interaction.commandName == "shop")
        {
            if(interaction.option._subcommandgroup == "item")
            {
                if(interaction.option._subcommand == "add")
                {
                    console.log("oui je marche enfin presque");
					console.log("J'aime les poneys :D");
                }
            }
        }

    }
}