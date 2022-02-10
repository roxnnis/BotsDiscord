const Classes = require("../../classes.js");
//C:/Users/User/Documents/Bot Discord/BotsDiscord/RolePlay/
const fs = require("fs");

function PersoAdd(rolistes, interaction){

	tempo = new Classes.Personnage({
		Nom: interaction.options.getString("nom"),
		Stats: new Classes.Stats(
			{
				phy: interaction.options.getInteger("phy"),
				men: interaction.options.getInteger("men"),
				int: interaction.options.getInteger("int"),
				soc: interaction.options.getInteger("soc"),
				cha: interaction.options.getInteger("cha")
			}),
		
	});
	
	rolistes[tempo.Nom] = {
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

	fs.writeFileSync("Personnages.json", JSON.stringify(rolistes));
}

exports.PersoAdd = PersoAdd;