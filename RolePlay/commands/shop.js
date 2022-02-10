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

    //shop >> add
    .addSubcommand(subcommand =>
        subcommand
        .setName("add")
        .setDescription("Ajoute un objet au shop")
    )
    ,
	async execute(interaction){}
}