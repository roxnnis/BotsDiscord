//File Search
const fs = require("fs");

//Récupérer les classes
const { Personnages } = require(`../../classes/Personnages`);
const { Stats } = require("../../classes/Stats");

/**
 * Ajoute un personnage dans le registre.
 * @param rolistes : Dictionnaire contenant tous les personnages (Disparition prochaine...)
 * @param interaction : Commande slash dont on récupère les informations
 */
function PersoAdd(rolistes, interaction){

	tempo = new Personnages({
		Nom: interaction.options.getString("nom"),
		Stats: new Stats(
			{
				phy: interaction.options.getInteger("phy"),
				men: interaction.options.getInteger("men"),
				int: interaction.options.getInteger("int"),
				soc: interaction.options.getInteger("soc"),
				cha: interaction.options.getInteger("cha")
			})
	});
	const USER_ID = interaction.options.getUser("usr").id;

	rolistes[tempo.Nom] = {
		User: USER_ID,
		Nom: tempo.Nom,
		LVL: tempo.LVL,
		Money: tempo.Money,
		Weight: tempo.Weight.Total,
		PV: tempo.PV,
		Stats: tempo.Stats,
		Weapons: tempo.Weapons,
		Armors: tempo.Armors,
		Inv: tempo.Inv,
		Dcm: tempo.Dcm
	};

	fs.writeFileSync("./donnees/Personnages.json", JSON.stringify(rolistes));
}

exports.PersoAdd = PersoAdd;