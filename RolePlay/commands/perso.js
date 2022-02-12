//Requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

const PInf = require(`${process.cwd()}/commands/fonctions/personnageInfo.js`);
const PAdd = require(`${process.cwd()}/commands/fonctions/personnageAdd.js`);
const AdIn = require("./fonctions/addInventory.js");

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
				.setDescription("Admin : Créer un personnage")
				//Perso >> Add >> Options
				.addUserOption((option) => option.setName("usr").setDescription("Utilisateur possédant le personnage").setRequired(true))
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
				.setDescription("Admin : Changer le DCM d'un joueur")
				//Perso >> dcm >> Options
				.addStringOption((option) => option.setName("nom").setDescription("Nom du personnage").setRequired(true))
				.addStringOption((option) => option.setName("dcm").setDescription("Nom du nouveau DCM").setRequired(true))
			//Perso >> item >> add >> options
			//Perso >> item >> del >> options
		)
		.addSubcommandGroup(subcommandgroup =>
			subcommandgroup
				.setName("item")
				.setDescription("Action sur l'inventaire d'un joueur")
				//item add
				.addSubcommand(subcommand =>
					subcommand
						.setName("give")
						.setDescription("ADMIN : Ajouter un objet à l'inventaire d'un joueur")
						.addStringOption((option) => option.setName("nom").setDescription("Nom du joueur").setRequired(true))
						.addStringOption((option) => option.setName("objet").setDescription("Nom de l'objet").setRequired(true))
						.addIntegerOption((option) => option.setName("qtty").setDescription("Nombre d'exemplaires").setRequired(true))
						.addBooleanOption((option) => option.setName("visi").setDescription("Message visible").setRequired(true))
					)
				//item del
				.addSubcommand(subcommand =>
					subcommand
						.setName("del")
						.setDescription("ADMIN : Retirer un objet à l'inventaire d'un joueur")
						.addStringOption((option) => option.setName("nom").setDescription("Nom du joueur").setRequired(true))
						.addStringOption((option) => option.setName("objet").setDescription("Nom de l'objet").setRequired(true))
						.addBooleanOption((option) => option.setName("visi").setDescription("Message visible").setRequired(true))
					)
				//item use
				.addSubcommand(subcommand =>
					subcommand
						.setName("use")
						.setDescription("Utilise un objet")
						.addStringOption((option) => option.setName("nom").setDescription("Nom du joueur").setRequired(true))
						.addStringOption((option) => option.setName("objet").setDescription("Nom de l'objet").setRequired(true))
						.addIntegerOption((option) => option.setName("qtty").setDescription("Nombre d'exemplaires").setRequired(true))
					)
		)
		,
	async execute(interaction) {

		var rolistes = JSON.parse(fs.readFileSync("./donnees/Personnages.json"));
		var boutique = JSON.parse(fs.readFileSync("./donnees/Shop.json"));

		//INFORMATIONS DU PERSONNAGE
		if (interaction.options._subcommand == "info") {
			NomDonne = interaction.options.getString("nom"); //Requête par nom
			await interaction.reply({ embeds: [PInf.PersoInfo(rolistes)] });
		}
		//AJOUTER UN PERSONNAGE
		else if (interaction.options._subcommand == "add") {
			if (interaction.user.id == "185352234580574208" || interaction.user.id == "306020612747427841") {
				//Ajout
				PAdd.PersoAdd(rolistes, interaction);
				await interaction.reply("Votre personnage vient d'être créé.");
			} else {
				await interaction.reply("Vous n'avez pas les droits pour créer un personnage.");

			}
		}
		//CHANGER LE DCM
		else if (interaction.options._subcommand == "dcm") {
			if (interaction.user.id == "185352234580574208" || interaction.user.id == "306020612747427841") {
			NomDonne = interaction.options.getString("nom"); //Requête par nom
			rolistes[NomDonne].Dcm = interaction.options.getString("dcm");
			fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
			await interaction.reply("Votre DCM vient d'être modifié.");
			} else {
				await interaction.reply({content: "Vous n'avez pas les droits pour effectuer cette commande", ephemeral:true});
			}
			//Personnage dcm set
		}
		
		//Partie Itema
		else if (interaction.options._group == "item")
		{
			//nom, objet, qtty
			if(interaction.options._subcommand == "give")
			{
				joueurNom = interaction.options.getString("nom");
				nomObjet = interaction.options.getString("objet");
				qtt = interaction.options.getInteger("qtty");
				visible = interaction.options.getBoolean("visi");
				if(qtt <= 0){qtt = 1;}
				try{
					if(typeof rolistes[joueurNom] === "undefined") throw "No player";
					else if(typeof boutique.shop.ShopObjet[nomObjet] === "undefined") throw "No Item";
					else{
						for(i=0;i<qtt;i++){
							rolistes = AdIn.AddInventory(rolistes,boutique.shop.ShopObjet[nomObjet].Objet,joueurNom);
						}
						fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
						await interaction.reply({ content: joueurNom + " à reçu " + nomObjet, ephemeral : visible});
					}
				} catch(err){
					if(err == "No player") await interaction.reply({ content: "Ce joueur n'existe pas", ephemeral: true});
					else if(err == "No Item") await interaction.reply({ content: "Cet objet n'existe pas", ephemeral: true});
				}
			}


			if(interaction.options._subcommand == "del")
			{
				joueurNom = interaction.options.getString("nom");
				objetNom = interaction.options.getString("objet");
				visible = interaction.options.getBoolean("visi");

				try{
					if(typeof rolistes[joueurNom] === "undefined") throw "No player";
					else{
						for(var key in rolistes[joueurNom].Inv)
						{
							if(key.substring(0,objetNom.length) == objetNom)
							{
								delete rolistes[joueurNom].Inv[key];
							}
						}
						fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
						await interaction.reply({ content: joueurNom + " à perdu " + objetNom, ephemeral : visible});
					}
				} catch(err){
					if(err == "No player") await interaction.reply({ content: "Ce joueur n'existe pas", ephemeral: true});
					else if(err == "No Item") await interaction.reply({ content: "Cet objet n'existe pas", ephemeral: true});
				}
			}

			if(interaction.options._subcommand == "use")
			{
				joueurNom = interaction.options.getString("nom");
				objetNom = interaction.options.getString("objet");
				qtt = interaction.options.getInteger("qtty");
				
				if(qtt <= 0){qtt = 1;}
				try{
					if(typeof rolistes[joueurNom] === "undefined") throw "No player";
					else{
						var temponame = "";
						for(var key in rolistes[joueurNom].Inv)
						{
							if(key.substring(0,objetNom.length) == objetNom && temponame == "")
							{
								temponame = key;
							}
						}
						if(typeof rolistes[joueurNom].Inv[temponame].Remain !== "undefined")
						{
							if(rolistes[joueurNom].Inv[temponame].Remain >= qtt)
							{
								rolistes[joueurNom].Inv[temponame].Remain -= qtt;
							}
							else
							{
								rolistes[joueurNom].Inv[temponame].Remain = 0;
							}
							if(rolistes[joueurNom].Inv[temponame].Remain == 0)
							{
								delete rolistes[joueurNom].Inv[temponame];
							}
						}
						else
						{
							delete rolistes[joueurNom].Inv[temponame];
						}
						fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
						await interaction.reply({ content: joueurNom + " à utilisé " + objetNom, ephemeral : false});
					}
				} catch(err){
					if(err == "No player") await interaction.reply({ content: "Ce joueur n'existe pas", ephemeral: true});
					else if(err == "No Item") await interaction.reply({ content: "Cet objet n'existe pas", ephemeral: true});
				}
			}
			


		}

		
		
		
		
		else {
			await interaction.reply({
				content: "La commande n'a pas aboutie.",
				ephemeral: true,
			});
		}
	}
}