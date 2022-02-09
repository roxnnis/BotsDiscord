const { MessageEmbed } = require("discord.js");

function PersoInfo(rolistes){
	//Requête par nom trouve une correspondance dans base JSON
				embed = new MessageEmbed()
					.setColor("AQUA")
					.setTitle("Fiche de personnage")
					.setDescription("Joueur : " + NomDonne)
					.addField("\u200b", "\u200b")
					.addFields(
						{ name: "Nom", value: rolistes[NomDonne].Nom },
						{
							name: "Niveau",
							value: rolistes[NomDonne].LVL.toString(),
							inline: true,
						},
						{
							name: "Argent",
							value: rolistes[NomDonne].Money.toString(),
							inline: true,
						},
						{
							name: "Charge",
							value: rolistes[NomDonne].Weight.toString() + "kg",
							inline: true,
						},
						{
							name: "Vie",
							value:
								rolistes[NomDonne].PV.Actuel + "/" + rolistes[NomDonne].PV.Total,
						},
						{
							name: "__Statistiques :__",
							value:
								"Physique : " +
								rolistes[NomDonne].Stats.PHY.toString() +
								"\r\nMental : " +
								rolistes[NomDonne].Stats.MEN.toString() +
								"\r\nIntelligence : " +
								rolistes[NomDonne].Stats.INT.toString() +
								"\r\nSocial : " +
								rolistes[NomDonne].Stats.SOC.toString() +
								"\r\nChance : " +
								rolistes[NomDonne].Stats.CHA.toString(),
						}
					);

				//ARMES
				//Principale
				EmbArmes =
					"__Principale :__\r\nNom : " +
					rolistes[NomDonne].Weapons.Principale.Nom +
					"\r\nType : " +
					rolistes[NomDonne].Weapons.Principale.Type +
					"\r\nMains : " +
					rolistes[NomDonne].Weapons.Principale.Hand +
					"\r\nPoids : " +
					rolistes[NomDonne].Weapons.Principale.Weight +
					"kg\r\nDégâts : " +
					rolistes[NomDonne].Weapons.Principale.Damage +
					"\r\nPrécision : " +
					rolistes[NomDonne].Weapons.Principale.Precision;

				//Arme à munitions ?
				if (
					typeof rolistes[NomDonne].Weapons.Principale.Munitions !== "undefined"
				) {
					EmbArmes +=
						"\r\nMunitions : " +
						rolistes[NomDonne].Weapons.Principale.Munitions.Chargeur.toString() +
						" + " +
						rolistes[NomDonne].Weapons.Principale.Munitions.Reserve.toString();
				}

				//Effets ?
				if (
					typeof rolistes[NomDonne].Weapons.Principale.Effects !== "undefined"
				) {
					EmbArmes += "\r\nEffet(s) : ";
				}
				for (var key in rolistes[NomDonne].Weapons.Principale.Effects) {
					EmbArmes +=
						"\r\n> " +
						key +
						" : " +
						rolistes[NomDonne].Weapons.Principale.Effects[key];
				}

				if (rolistes[NomDonne].Weapons.Auxiliaire.Nom !== "Aucune") {
					//Auxiliaire
					EmbArmes +=
						"\r\n\r\n__Secondaire :__\r\nNom : " +
						rolistes[NomDonne].Weapons.Auxiliaire.Nom +
						"\r\nType : " +
						rolistes[NomDonne].Weapons.Auxiliaire.Type +
						"\r\nMains : " +
						rolistes[NomDonne].Weapons.Auxiliaire.Hand +
						"\r\nPoids : " +
						rolistes[NomDonne].Weapons.Auxiliaire.Weight +
						"kg\r\nDégâts : " +
						rolistes[NomDonne].Weapons.Auxiliaire.Damage +
						"\r\nPrécision : " +
						rolistes[NomDonne].Weapons.Auxiliaire.Precision;

					//Arme à munitions ?
					if (typeof rolistes[NomDonne].Weapons.Auxiliaire.Munitions !== "undefined") {
						EmbArmes +=
							"\r\nMunitions : " +
							rolistes[
								NomDonne
							].Weapons.Auxiliaire.Munitions.Chargeur.toString() +
							" + " +
							rolistes[NomDonne].Weapons.Auxiliaire.Munitions.Reserve.toString();
					}

					//Effets ?
					if (typeof rolistes[NomDonne].Weapons.Auxiliaire.Effects !== "undefined") {
						EmbArmes += "\r\nEffet(s) : ";
					}
					for (var key in rolistes[NomDonne].Weapons.Auxiliaire.Effects) {
						EmbArmes +=
							"\r\n> " +
							key +
							" : " +
							rolistes[NomDonne].Weapons.Auxiliaire.Effects[key];
					}
				}
				//Ajout des Armes dans l'Embed
				embed.addField("Armes", EmbArmes, true);

				//ARMURES
				//Principale
				EmbArmures =
					"__Principale :__\r\nNom : " +
					rolistes[NomDonne].Armors.Principale.Nom +
					"\r\nType : " +
					rolistes[NomDonne].Armors.Principale.Type +
					"\r\nPoids : " +
					rolistes[NomDonne].Armors.Principale.Weight +
					"kg\r\nRésistances : \r\n> Physique : " +
					rolistes[NomDonne].Armors.Principale.Res.PHY +
					"\r\n> Mentale : " +
					rolistes[NomDonne].Armors.Principale.Res.MEN;

				//Résistances autres ?
				if (typeof rolistes[NomDonne].Armors.Principale.Res.OTHERS["None"] === "undefined") {
					for (var key in rolistes[NomDonne].Armors.Principale.Res.OTHERS)
						EmbArmures += "\r\n> " + key + " : " + rolistes[NomDonne].Armors.Principale.Res.OTHERS[key].toString()
				}

				//Effets ?
				if (typeof rolistes[NomDonne].Armors.Principale.Effects !== "undefined") {
					EmbArmures += "\r\nEffet(s) : ";
				}
				for (var key in rolistes[NomDonne].Armors.Principale.Effects) {
					EmbArmures +=
						"\r\n> " +
						key +
						" : " +
						rolistes[NomDonne].Armors.Principale.Effects[key];
				}

				//Ajout des Armures dans l'Embed
				embed.addField("Armures", EmbArmures, true);

				//INVENTAIRE
				var EmbInv = "";
				console.log("223Per - ", rolistes[NomDonne].Inv);
				for (var key in rolistes[NomDonne].Inv) {
					EmbInv += rolistes[NomDonne].Inv[key].Quantity.toString() + "x " + rolistes[NomDonne].Inv[key].Nom;
					//Nombre d'utilisations restantes ?
					if (typeof rolistes[NomDonne].Inv[key].Remain !== "undefined") {
						EmbInv += " (Remain : " + rolistes[NomDonne].Inv[key].Remain.toString() + rolistes[NomDonne].Inv[key].Unity + ")"
					}

					//Qualité ?
					if (typeof rolistes[NomDonne].Inv[key].Quality !== "undefined") {
						EmbInv += "\r\nÉtat : " + rolistes[NomDonne].Inv[key].Quality
					}

					//Poids
					EmbInv += "\r\nPoids : " + rolistes[NomDonne].Inv[key].Weight.toString() + "kg"

					if (typeof rolistes[NomDonne].Inv[key].Description !== "undefined") {
						EmbInv += "\r\nDescription : " + rolistes[NomDonne].Inv[key].Description
					}
					EmbInv += "\r\n";
				}

				//Ajout des Objets dans l'Embed
				embed.addField("Inventaire", EmbInv);
	return embed;
}

exports.PersoInfo = PersoInfo;