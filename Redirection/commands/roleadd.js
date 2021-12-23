const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Ajoute un rôle à auto attribuer")
    .addRoleOption((option) =>
      option
        .setName("rôle")
        .setDescription("Préciser le rôle à donner")
        .setRequired(true)
    ),
  async execute(interaction) {
	//   roleDonne = interaction.options.getRole("rôle"); //Rôle donné en paramètre
	//   console.log(interaction.options);
	//   console.log(interaction.channel)
	//   interaction.reply("Bonsoir :D")
  }
}
