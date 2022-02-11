class Personnage {
	//#region Caractéristiques privées de base
	#NOM = "Charlie";
	#PV;
	#LVL = 1;
	#WEIGHT;
	#MONEY = 1000;

	#STATS = new Stats();
	#WEAPONS = { Principale: new Armes() }
	#ARMORS = { Principale: new Armures() }
	#INV = {};
	#DCM = "Aucun";

	//#endregion
	//#region Constructeur
	constructor(
		{
			Nom = this.#NOM,
			LVL = this.#LVL,
			Money = this.#MONEY,
			Stats = this.#STATS,
			Weapons = this.#WEAPONS,
			Armors = this.#ARMORS,
			DCM = this.#DCM,
			INV = this.#INV,
		} = {}
		//#endregion 
		//#region Variables appliquées au constructeur
	) {
		//Nom
		this.#NOM = Nom;
		//Niveau
		this.#LVL = LVL;
		//Argent
		this.#MONEY = Money;

		//Statistiques
		this.#STATS = {
			PHY: Stats.Phy,
			MEN: Stats.Men,
			INT: Stats.Int,
			SOC: Stats.Soc,
			CHA: Stats.Cha,
		};

		//Calcul des PV
		if (this.#STATS["PHY"] != 0 || this.#STATS["MEN"] != 0)
			this.#PV = {
				Actuel: this.#STATS["PHY"] * 2 + this.#STATS["MEN"],
				Total: this.#STATS["PHY"] * 2 + this.#STATS["MEN"],
			};
		else this.#PV = { Actuel: 1, Total: 1 };

		//Récupérer les armes

		for (var key in Weapons) {
			this.#WEAPONS[key] = {
				Nom: Weapons[key].Nom,
				Type: Weapons[key].Type,
				Hand: Weapons[key].Hand,
				Weight: Weapons[key].Weight,
				Damage: Weapons[key].Damage,
				Precision: Weapons[key].Precision,
			};
			this.#WEAPONS[key]["Effects"] = Weapons[key].Effects;
			if (typeof Weapons[key].Munitions !== "undefined") {
				this.#WEAPONS[key]["Munitions"] = Weapons[key].Munitions;
			}
		}

		//Récupérer les armures
		for (var key in Armors) {
			this.#ARMORS[key] = {
				Nom: Armors[key].Nom,
				Type: Armors[key].Type,
				Weight: Armors[key].Weight,
				Res: Armors[key].Res,
			}
			this.#ARMORS[key]["Effects"] = Armors[key].Effects;

		}

		//DCM
		this.#DCM = DCM;

		//Inventaire
		this.#INV = INV;

		//Calcul du poids
		var calculPoids = function (type, P) {
			if (type == "Armes" || type == "All") {
				P.#WEIGHT["Armes"] = 0;
				for (var key in P.#WEAPONS) {
					P.#WEIGHT["Armes"] += P.#WEAPONS[key]["Weight"];
				}
			}
			if (type == "Armures" || type == "All") {
				P.#WEIGHT["Armures"] = 0;
				for (var key in P.#ARMORS) {
					P.#WEIGHT["Armures"] += P.#ARMORS[key]["Weight"];
				}
			}
			if (type == "Inventaire" || type == "All") {
				P.#WEIGHT["Inventaire"] = 0;
				for (var key in P.#INV) {
					if (P.#INV[key]["Poids"] != undefined) {
						P.#WEIGHT["Inventaire"] += P.#INV[key]["Quantity"] * P.#INV[key]["Weight"];
					}
				}
			}
			P.#WEIGHT["Total"] =
				P.#WEIGHT["Armes"] + P.#WEIGHT["Armures"] + P.#WEIGHT["Inventaire"];
		};

		//Poids (Initialisation)
		this.#WEIGHT = { Total: 0, Armes: 0, Armures: 0, Inventaire: 0 };

		//Calcul du poids de l'inventaire
		calculPoids("All", this);
	}
	//#endregion
	//#region Fonctions utilisables sur le Personnage

	//Obtenir le nom
	get Nom() {
		return this.#NOM;
	}
	//Modifier le nom
	set Nom(name) {
		try {
			if (typeof name != "string") throw "Bad type";
			else if (name == "") throw "Bad length";
			else return (this.#NOM = name.substring(0, 31));
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : String || Donné :", typeof name);
			} else if (err == "Bad length")
				console.log("Erreur : La longueur du nom donné est insuffisante.");
		}
	}

	//Obtenir le niveau
	get LVL() {
		return this.#LVL;
	}
	//Modifier le niveau
	set LVL(level) {
		try {
			if (typeof level != "number") throw "Bad type";
			else if (level < 0 || !Number.isInteger(level))
				throw "Not a positive integer or zero";
			else this.#LVL = level;
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : Nombre || Donné :", typeof level);
			} else if (err == "Not a positive integer or zero")
				console.log("La valeur ne peut pas être négative ou à virgule.");
		}
	}

	//Obtenir le poids
	get Weight() {
		return this.#WEIGHT;
	}

	//Obtenir les PV
	get PV() {
		return { Actuel: this.#PV.Actuel, Total: this.#PV.Total };
	}
	//Modifier les points de vie
	set PV(HP) {
		try {
			if (typeof HP != "number") throw "Bad type";
			else if (!Number.isInteger(HP)) throw "Not an integer";
			else {
				this.#PV["Actuel"] = HP;
			}
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : Nombre || Donné :", typeof HP);
			} else if (err == "Not an integer") {
				console.log("La valeur ne peut pas être à virgule.");
			}
		}
	}
	//Obtenir l'argent
	get Money() {
		return this.#MONEY;
	}
	//Modifier l'argent
	set Money(CASH) {
		try {
			if (typeof CASH != "number") throw "Bad type";
			else if (!Number.isInteger(CASH)) throw "Not an integer";
			else this.#MONEY = CASH;
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : Nombre || Donné :", typeof CASH);
			} else if (err == "Not an integer") {
				console.log("La valeur ne peut pas être à virgule.");
			}
		}
	}
	//Obtenir les Stats
	get Stats() {
		return {
			PHY: this.#STATS["PHY"],
			MEN: this.#STATS["MEN"],
			INT: this.#STATS["INT"],
			SOC: this.#STATS["SOC"],
			CHA: this.#STATS["CHA"],
		};
	}
	//Modifier les Stats
	modifyStats(stat, value = 0) {
		switch (stat) {
			case "Phy":
				this.#STATS["PHY"] = value;
				break;
			case "Men":
				this.#STATS["MEN"] = value;
				break;
			case "Int":
				this.#STATS["INT"] = value;
				break;
			case "Soc":
				this.#STATS["SOC"] = value;
				break;
			case "Cha":
				this.#STATS["CHA"] = value;
				break;
			case "All":
				this.#STATS["PHY"] = value;
				this.#STATS["INT"] = value;
				this.#STATS["MEN"] = value;
				this.#STATS["CHA"] = value;
				this.#STATS["SOC"] = value;
				break;
			default:
				null;
		}
	}
	//Obtenir les Armes
	get Weapons() {
		var objectWeapons = {};
		for (var key in this.#WEAPONS) {
			objectWeapons[key] = this.#WEAPONS[key];
		}
		return objectWeapons;
	}
	//Obtenir les Armures
	get Armors() {
		var objectArmors = {};
		for (var key in this.#ARMORS) {
			objectArmors[key] = this.#ARMORS[key];
		}
		return objectArmors;
	}
	//Obtenir l'inventaire
	get Inv() {
		var objectInv = {};
		for (var key in this.#INV) {
			objectInv[key] = this.#INV[key].getInfo();
		}
		return objectInv;
	}
	set Inv(objet){
		var key = objet.Nom;
		if(objet.Stackable == false && typeof this.#INV[key] !== "undefined")
		{
			var i = 0;
			while(i = 0 || typeof this.#INV[key + i] === "undefined"){i++;}
			this.#INV[key + i] = new Objet({
				Nom:objet.Nom,
				Quantity:objet.Quantity,
				Stackable:objet.Stackable,
				Remain:objet.Remain,
				Unity:objet.Unity,
				Quality:objet.Quality,
				Weight:objet.Weight,
				Description:objet.Description
			});
		} else if (objet.Stackable == false && typeof this.#INV[key] === "undefined"){
			this.#INV[key] = new Objet({
				Nom:objet.Nom,
				Quantity:objet.Quantity,
				Stackable:objet.Stackable,
				Remain:objet.Remain,
				Unity:objet.Unity,
				Quality:objet.Quality,
				Weight:objet.Weight,
				Description:objet.Description
			});
		} else if (objet.Stackable == true && typeof this.#INV[key] !== "undefined"){
			this.#INV[key] += objet.Quantity;
		} else{
			this.#INV[key] += new Objet({
				Nom:objet.Nom,
				Quantity:objet.Quantity,
				Stackable:objet.Stackable,
				Remain:objet.Remain,
				Unity:objet.Unity,
				Quality:objet.Quality,
				Weight:objet.Weight,
				Description:objet.Description
			});
		}
	}
	//DCM
	get Dcm() {
		return this.#DCM;
	}
	set Dcm(newDCM) {
		try {
			if (typeof newDCM != "string") throw "Bad type";
			else this.#MONEY = newDCM;
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : string || Donné :", typeof newDCM);
			}
		}
	}

	AddItemInInventory(objet, qtt)
	{

	}
	//#endregion
}