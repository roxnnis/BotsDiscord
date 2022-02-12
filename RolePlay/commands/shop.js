//Requires
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const Spl = require("./fonctions/shopList.js");
const AdIn = require("./fonctions/addInventory.js");

//Récupération des permissions
const PERMISSIONS = JSON.parse(fs.readFileSync("./donnees/Whitelist.json"));
const ADMIN = "185352234580574208";

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
						.setDescription("Admin : Ajoute un objet")
						// shop >> item >> add >> options
						.addBooleanOption((option) => option.setName("visi").setDescription("L'item est-il visible dans le shop").setRequired(true))
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
						.addStringOption((option) => option.setName("joueur").setDescription("Joueur demandant la requête").setRequired(false))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("buy")
						.setDescription("Acheter un objet")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom du Joueur").setRequired(true))
						.addStringOption((option) => option.setName("item").setDescription("Nom de l'objet").setRequired(true))
						.addIntegerOption((option) => option.setName("qtty").setDescription("Quantité acheté").setRequired(false))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("set")
						.setDescription("Acheter un objet")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("item").setDescription("Nom de l'objet").setRequired(true))
						.addBooleanOption((option) => option.setName("visi").setDescription("Visibilité de l'objet").setRequired(true))
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
						.setDescription("Admin : Ajoute une arme")
						// shop >> item >> add >> options
						.addBooleanOption((option) => option.setName("visi").setDescription("L'arme est-elle visible dans le shop").setRequired(true))
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
						.addStringOption((option) => option.setName("joueur").setDescription("Joueur demandant la requête").setRequired(false))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("effect")
						.setDescription("Admin : Ajouter un effet à une arme")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'arme qui va recevoir l'effet").setRequired(true))
						.addStringOption((option) => option.setName("efct").setDescription("Nom de l'effet").setRequired(true))
						.addStringOption((option) => option.setName("stat").setDescription("Effet").setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("buy")
						.setDescription("Acheter une arme")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom du Joueur").setRequired(true))
						.addStringOption((option) => option.setName("arme").setDescription("Nom de l'arme").setRequired(true))
						.addStringOption((option) => option.setName("slot").setDescription("Emplacement de l'arme").setRequired(false)
							.addChoice("Main principale", "Principale").addChoice("Main secondaire", "Auxiliaire"))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("set")
						.setDescription("Acheter un objet")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("item").setDescription("Nom de l'objet").setRequired(true))
						.addBooleanOption((option) => option.setName("visi").setDescription("Visibilité de l'objet").setRequired(true))
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
						.setDescription("Admin : Ajoute une armure")
						// shop >> item >> add >> options
						.addBooleanOption((option) => option.setName("visi").setDescription("L'armure est-elle visible dans le shop").setRequired(true))
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
						.addStringOption((option) => option.setName("joueur").setDescription("Joueur demandant la requête").setRequired(false))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("effect")
						.setDescription("Admin : Ajouter un effet à une armure")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom de l'armure qui va recevoir l'effet").setRequired(true))
						.addStringOption((option) => option.setName("efct").setDescription("Nom de l'effet").setRequired(true))
						.addStringOption((option) => option.setName("stat").setDescription("Effet").setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("buy")
						.setDescription("Acheter une armure")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("nom").setDescription("Nom du Joueur").setRequired(true))
						.addStringOption((option) => option.setName("armure").setDescription("Nom de l'armure").setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
						.setName("set")
						.setDescription("Acheter un objet")
						// shop >> item >> list >> options
						.addStringOption((option) => option.setName("item").setDescription("Nom de l'objet").setRequired(true))
						.addBooleanOption((option) => option.setName("visi").setDescription("Visibilité de l'objet").setRequired(true))
				)
		)
	//#endregion
	,
	async execute(interaction) {

		var shp = fs.readFileSync("./donnees/Shop.json");
		var boutique = JSON.parse(shp);

		var pers = fs.readFileSync("./donnees/Personnages.json");
		var rolistes = JSON.parse(pers);

		//Tester si le paramètre est donné ou non
		function isNull(input, out) {
			return input != null ? input : out;
		}

		//Shop >> Item
		if (interaction.options._group == "item") {
			//Shop >> Item >> Add >> options
			if (interaction.options._subcommand == "add") {
				if (interaction.user.id == ADMIN) {
					var tempo = {
						Objet: {
							Nom: interaction.options.getString("nom"),
							Weight: interaction.options.getInteger("pods"),
							Quantity: isNull(interaction.options.getInteger("qtty"), 1),
							Stackable: isNull(interaction.options.getBoolean("stac"), false)
						},
						Prix: interaction.options.getInteger("prix"),
						Visible: interaction.options.getBoolean("visi")
					};
					if (isNull(interaction.options.getInteger("rest"), false)) {
						tempo.Objet["Remain"] = interaction.options.getInteger("rest");
						if (isNull(interaction.options.getString("unit"), false)) {
							tempo.Objet["Unity"] = interaction.options.getString("unit");
						}
					}

					boutique.shop["ShopObjet"][tempo.Objet.Nom] = {
						Objet: tempo.Objet,
						Prix: tempo.Prix,
						Visible: tempo.Visible
					}
					fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
					await interaction.reply("Item créé");
				} else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}

			//Shop >> Item >> List >> options
			else if (interaction.options._subcommand == "list") {
				if (PERMISSIONS[interaction.user.id] || interaction.user.id == ADMIN) {
					var mssProperty = { message: "Rien a dire", privee: true };
					if (interaction.options.getString("nom").toLowerCase() == "all") {
						mssProperty = Spl.ShopListObjet(boutique, "all", rolistes[interaction.options.getString("joueur")]);
					}
					else {
						mssProperty = Spl.ShopListObjet(boutique, interaction.options.getString("nom"), rolistes[interaction.options.getString("joueur")]);
					}
					await interaction.reply({ embeds: [mssProperty.message], ephemeral: mssProperty.privee });
				} else {
					await interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}


			//Shop >> Item >> Buy >> options
			else if (interaction.options._subcommand == "buy") {
				
				if (interaction.user.id == ADMIN || (PERMISSIONS[interaction.user.id] !== null && PERMISSIONS[interaction.user.id][interaction.options.getString("nom")])) {
					joueurNom = interaction.options.getString("nom");
					qtt = interaction.options.getInteger("qtty");
					nomObjet = interaction.options.getString("item");
					if (qtt <= 0) { qtt = 1; }
					try {
						if (typeof boutique.shop.ShopObjet[nomObjet] === "undefined") throw "No Item";
						else if (typeof rolistes[joueurNom] === "undefined") throw "No player";
						else if (!boutique.shop.ShopObjet[nomObjet].Visible) throw "No Item";
						else {
							if (rolistes[joueurNom].Money >= (boutique.shop.ShopObjet[nomObjet].Prix * qtt)) {
								for (i = 0; i < qtt; i++) {
									rolistes = AdIn.AddInventory(rolistes, boutique.shop.ShopObjet[nomObjet].Objet, joueurNom);
								}
								rolistes[joueurNom].Money -= boutique.shop.ShopObjet[nomObjet].Prix * qtt;
								fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
								await interaction.reply({ content: joueurNom + " a acheté " + qtt + " " + nomObjet, ephemeral: true });
							}
							else {
								await interaction.reply({ content: "Le joueur " + joueurNom + " n'a pas assez d'argent pour acheter " + nomObjet, ephemeral: true });
							}
						}
					} catch (err) {
						if (err == "No Item") {
							await interaction.reply({ content: "Il n'y a pas d'item de ce nom dans le shop", ephemeral: true });
						}
						else if (err == "No player") {
							await interaction.reply({ content: "Il n'y a pas de joueur de ce nom", ephemeral: true });
						}
					}
				} else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}

			}

			//Shop >> Item >> set >> options
			else if (interaction.options._subcommand == "set") {
				if (interaction.user.id == ADMIN) {
					var objetNom = interaction.options.getString("item");
					var visibility = interaction.options.getBoolean("visi");

					try{
						if(typeof boutique.shop.ShopObjet[objetNom] === "undefined") throw "No Item";
						else{
							boutique.shop.ShopObjet[objetNom].Visible = visibility;
							fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
							await interaction.reply({ content: "Nouvelle visibilité set", ephemeral: true });
						}
					}catch (err){
						if(err == "No Item") await interaction.reply({ content: "No Item", ephemeral: true });
					}
				} else {
					await interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}
		}

		else if (interaction.options._group == "arme") {
			//Shop >> Item >> Add >> options
			if (interaction.options._subcommand == "add") {
				if (interaction.user.id == ADMIN) {
					var tempo = {
						Objet: {
							Nom: interaction.options.getString("nom"),
							Type: interaction.options.getString("type"),
							Hand: interaction.options.getInteger("main"),
							Weight: interaction.options.getInteger("pods"),
							Damage: interaction.options.getInteger("dega"),
							Precision: interaction.options.getInteger("prec"),
							Effects: {}
						},
						Prix: interaction.options.getInteger("prix"),
						Visible: interaction.options.getBoolean("visi")
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
					fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
					await interaction.reply("Arme créé");
				} else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}

			else if (interaction.options._subcommand == "list") {
				if (PERMISSIONS[interaction.user.id] || interaction.user.id == ADMIN) {
					var mssProperty = { message: "Rien a dire", privee: true };
					if (interaction.options.getString("nom").toLowerCase() == "all") {
						mssProperty = Spl.ShopListArme(boutique, "all", rolistes[interaction.options.getString("joueur")]);
					}
					else {
						mssProperty = Spl.ShopListArme(boutique, interaction.options.getString("nom"), rolistes[interaction.options.getString("joueur")]);
					}
					await interaction.reply({ embeds: [mssProperty.message], ephemeral: mssProperty.privee });
				} else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}

			else if (interaction.options._subcommand == "buy") {
				if (interaction.user.id == ADMIN || (PERMISSIONS[interaction.user.id] !== null && PERMISSIONS[interaction.user.id][interaction.options.getString("nom")])) {
					nomObjet = interaction.options.getString("arme");
					joueurNom = interaction.options.getString("nom");
					try {
						if (typeof boutique.shop.ShopArmes[nomObjet] === "undefined") throw "No Item";
						else if (typeof rolistes[joueurNom] === "undefined") throw "No player";
						else if (!boutique.shop.ShopArmes[nomObjet].Visible) throw "No Item";
						else {
							if (rolistes[joueurNom].Money >= boutique.shop.ShopArmes[nomObjet].Prix) {
								var weaponTempo = AdIn.AddWeapon({ rolistes: rolistes[joueurNom], objet: boutique.shop.ShopArmes[nomObjet].Objet, slot: isNull(interaction.options.getString("slot"), "Principale") });
								rolistes[joueurNom] = weaponTempo[0];
								rolistes[joueurNom].Money -= boutique.shop.ShopArmes[nomObjet].Prix;

								for (var i in weaponTempo[1]) {
									if (typeof boutique.shop.ShopArmes[weaponTempo[1][i].Nom] !== "undefined") {
										rolistes[joueurNom].Money += boutique.shop.ShopArmes[weaponTempo[1][i].Nom].Prix / 2;
									}
								}
								fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
								await interaction.reply({ content: joueurNom + " à acheter " + nomObjet, ephemeral: true });
							}
							else {
								await interaction.reply({ content: "Forgerons: Tu n'as pas assez d'argent pour acheter ce petit bijoux, reviens après quelque mission", ephemeral: true });
							}
						}
					} catch (err) {
						if (err == "No Item") {
							await interaction.reply({ content: "Forgerons: J'ai pas ça dans mes petites merveilles", ephemeral: true });
						}
						else if (err == "No player") {
							await interaction.reply({ content: "Il n'y a pas de joueur de ce nom", ephemeral: true });
						}
					}
				} else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}

			else if (interaction.options._subcommand == "effect") {
				if (interaction.user.id == ADMIN) {
					if (typeof boutique.shop.ShopArmes[interaction.options.getString("nom")] === "undefined") {
						await interaction.reply("L'objet n'existe pas");
					}
					else {
						boutique.shop.ShopArmes[interaction.options.getString("nom")].Objet.Effects[interaction.options.getString("efct")] = interaction.options.getString("stat");

						fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
						await interaction.reply("Effet ajouté");
					}
				}
				else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}

			//Shop >> Item >> set >> options
			else if (interaction.options._subcommand == "set") {
				if (interaction.user.id == ADMIN) {
					var objetNom = interaction.options.getString("item");
					var visibility = interaction.options.getBoolean("visi");

					try{
						if(typeof boutique.shop.ShopArmes[objetNom] === "undefined") throw "No Item";
						else{
							boutique.shop.ShopArmes[objetNom].Visible = visibility;
							fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
							await interaction.reply({ content: "Nouvelle visibilité set", ephemeral: true });
						}
					}catch (err){
						if(err == "No Item") await interaction.reply({ content: "No Item", ephemeral: true });
					}
				} else {
					await interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}
		}

		else if (interaction.options._group == "armure") {
			//Shop >> Item >> Add >> options
			if (interaction.options._subcommand == "add") {
				if (interaction.user.id == ADMIN) {
					var tempo = {
						Objet: {
							Nom: interaction.options.getString("nom"),
							Type: interaction.options.getString("type"),
							Weight: interaction.options.getInteger("pods"),
							Res: { PHY: interaction.options.getInteger("rphy"), MEN: interaction.options.getInteger("rmen") },
							Effects: {}
						},
						Prix: interaction.options.getInteger("prix"),
						Visible: interaction.options.getBoolean("visi")
					};

					boutique.shop["ShopArmures"][tempo.Objet.Nom] = {
						Objet: tempo.Objet,
						Prix: tempo.Prix,
						Visible: tempo.Visible
					}

					fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
					await interaction.reply("Armure créé");
				} else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}

			else if (interaction.options._subcommand == "list") {
				if (PERMISSIONS[interaction.user.id] || interaction.user.id == ADMIN) {
				var mssProperty = { message: "Rien a dire", privee: true };
				if (interaction.options.getString("nom").toLowerCase() == "all") {
					mssProperty = Spl.ShopListArmure(boutique, "all", rolistes[interaction.options.getString("joueur")]);
				}
				else {
					mssProperty = Spl.ShopListArmure(boutique, interaction.options.getString("nom"), rolistes[interaction.options.getString("joueur")]);
				}
				await interaction.reply({ embeds: [mssProperty.message], ephemeral: mssProperty.privee });
			}else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}}

			else if (interaction.options._subcommand == "effect") {
				if (interaction.user.id == ADMIN) {
				if (typeof boutique.shop.ShopArmures[interaction.options.getString("nom")] === "undefined") {
					await interaction.reply("L'objet n'existe pas");
				}
				else {
					boutique.shop.ShopArmures[interaction.options.getString("nom")].Objet.Effects[interaction.options.getString("efct")] = interaction.options.getString("stat");
					fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
					await interaction.reply("Effet ajouté");
				}
			}else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}}

			else if (interaction.options._subcommand == "buy") {
				if (interaction.user.id == ADMIN || (PERMISSIONS[interaction.user.id] !== null && PERMISSIONS[interaction.user.id][interaction.options.getString("nom")])) {
					nomObjet = interaction.options.getString("armure");
					joueurNom = interaction.options.getString("nom");
					try {
						if (typeof boutique.shop.ShopArmures[nomObjet] === "undefined") throw "No Item";
						else if (typeof rolistes[joueurNom] === "undefined") throw "No player";
						else if (!boutique.shop.ShopArmures[nomObjet].Visible) throw "No Item";
						else {
							if (rolistes[joueurNom].Money >= boutique.shop.ShopArmures[nomObjet].Prix) {
								var weaponTempo = AdIn.AddArmor({ rolistes: rolistes[joueurNom], objet: boutique.shop.ShopArmures[nomObjet].Objet });
								rolistes[joueurNom] = weaponTempo[0];
								rolistes[joueurNom].Money -= boutique.shop.ShopArmures[nomObjet].Prix;

								if (typeof boutique.shop.ShopArmures[weaponTempo[1][0].Nom] !== "undefined") {
									rolistes[joueurNom].Money += boutique.shop.ShopArmures[weaponTempo[1][0].Nom].Prix / 2;
								}
								fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
								await interaction.reply({ content: joueurNom + " à acheter " + nomObjet, ephemeral: true });
							}
							else {
								await interaction.reply({ content: "Armurier: \r\n\nTu n'as pas assez d'argent pour acheter ce petit bijoux, reviens après quelque mission", ephemeral: true });
							}
						}
					} catch (err) {
						if (err == "No Item") {
							await interaction.reply({ content: "Armurier: \r\n\nJ'ai pas ça dans mes petites merveilles", ephemeral: true });
						}
						else if (err == "No player") {
							await interaction.reply({ content: "Il n'y a pas de joueur de ce nom", ephemeral: true });
						}
					}
				} else {
					interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}

			//Shop >> Item >> set >> options
			else if (interaction.options._subcommand == "set") {
				if (interaction.user.id == ADMIN) {
					var objetNom = interaction.options.getString("item");
					var visibility = interaction.options.getBoolean("visi");

					try{
						if(typeof boutique.shop.ShopArmures[objetNom] === "undefined") throw "No Item";
						else{
							boutique.shop.ShopArmures[objetNom].Visible = visibility;
							fs.writeFileSync("./donnees/Shop.json", JSON.stringify(boutique));
							await interaction.reply({ content: "Nouvelle visibilité set", ephemeral: true });
						}
					}catch (err){
						if(err == "No Item") await interaction.reply({ content: "No Item", ephemeral: true });
					}
				} else {
					await interaction.reply({ content: "Vous n'avez pas le droit d'accéder à cette commande.", ephemeral: true })
				}
			}
		}
	}
}