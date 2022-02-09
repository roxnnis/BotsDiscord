const Classes = require("./classes.js")

//SHOP
const Shop = {
	Armes: {
		"Epée longue": new Classes.Armes({
			Nom: "Epée Longue",
			Type: "Epee",
			Hand: 1,
			Weight: 9,
			Damage: 6,
			Precision: 95,
			Effects: { None: "Aucun effet" }
		}),
		"Double lame": new Classes.Armes({
			Nom: "Double lame",
			Type: "Epee",
			Hand: 2,
			Weight: 18,
			Damage: 10,
			Precision: 85,
			Effects: { None: "Aucun effet" }
		}),
		"Epée lourde": new Classes.Armes({
			Nom: "Epee Lourde",
			Type: "Epee",
			Hand: 2,
			Weight: 15,
			Damage: 8,
			Precision: 75,
			Effects: { Etourdir: "Peut infliger un étourdissement" },
		}),
		"Hâche lourde": new Classes.Armes({
			Nom: "Hâche Lourde",
			Type: "Hâche",
			Hand: 2,
			Weight: 20,
			Damage: 10,
			Precision: 80,
			Effects: { Etourdir: "Peut infliger un étourdissement" },
		}),
		Hachette: new Classes.Armes({

		}),
		Dague: new Classes.Armes({}),
		"Masse d'arme": new Classes.Armes({}),
		"Arc composite": new Classes.Armes({}),
		"Fusil de chasse": new Classes.Armes({}),
		"Revolver composite": new Classes.Armes({
			Nom: "Revolver composite",
			Type: "Pistolet",
			Hand: 1,
			Weight: 5,
			Damage: 10,
			Precision: 40,
			Effects: {
				"Mi-Distance": "+20 de précision à mi-distance d'une cible.",
			},
		}),
	},
	Armures: {
		"Combinaison en cuir": new Classes.Armures({
			Nom: "Combinaison en cuir",
			Type: "Cuir",
			Weight: 15,
			Res: { PHY: 5, MEN: 5, OTHERS: { None: "None" } },
			Effects: { None: "Aucun effet" },
		}),
		"Combinaison lourde": new Classes.Armures({
			Nom: "Combinaison lourde",
			Type: "Cuir",
			Weight: 50,
			Res: { PHY: 15, MEN: 5, OTHERS: { None: "None" } },
			Effects: { None: "Aucun effet" },
		}),
		"Vêtements civil": new Classes.Armures({
			Nom: "Vêtements civil",
			Type: "Tissu",
			Weight: 1,
			Res: { PHY: 0, MEN: 0, OTHERS: { None: "None" } },
			Effects: { None: "Aucun effet" },
		}),
		"Toison de sniper": new Classes.Armures({
			Nom: "Toison de sniper",
			Type: "Cuir",
			Weight: 15,
			Res: { PHY: 5, MEN: 5, OTHERS: { None: "None" } },
			Effects: {
				"Longue distance": "+30 de précision à longue distance d'une cible.",
			},
		}),
		"Cuissard d'artilleur": new Classes.Armures({
			Nom: "Cuissard d'artilleur",
			Type: "Cuir",
			Weight: 10,
			Res: { PHY: 5, MEN: 3, OTHERS: { None: "None" } },
			Effects: { "Mi-Distance": "+30 de précision à mi-distance d'une cible." },
		}),
	},
	DCM: {},
	Consommables: {
		"Corde": new Classes.Objet({ Nom: "Corde", Remain: 15, Unity: "m", Weight: 15 })
	},
};

exports.Shop = Shop;
