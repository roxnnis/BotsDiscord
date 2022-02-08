//Classes
//STATS
//-------------------------------------------------
class Stats {
	//#region Caractéristiques privées de base
	#PHY = 0;
	#MEN = 0;
	#INT = 0;
	#SOC = 0;
	#CHA = 0;
	//#endregion
	//#region Constructeur
	constructor(
		{
			phy = this.#PHY,
			men = this.#MEN,
			int = this.#INT,
			soc = this.#SOC,
			cha = this.#CHA,
		} = {}
		//#endregion
		//#region Variables appliquées au constructeur
	) {
		this.#PHY = phy;
		this.#MEN = men;
		this.#INT = int;
		this.#SOC = soc;
		this.#CHA = cha;
	}
	//#endregion
	//#region Fonctions utilisables sur les Stats
	//Obtenir les statistiques
	get Phy() {
		return this.#PHY;
	}
	get Men() {
		return this.#MEN;
	}
	get Int() {
		return this.#INT;
	}
	get Soc() {
		return this.#SOC;
	}
	get Cha() {
		return this.#CHA;
	}
	//#endregion
}

//ARMES
//-------------------------------------------------
class Armes {
	//#region Caractéristiques privées de base
	#NOM = "Aucune";
	#TYPE = "None";
	#HAND = 0;
	#WEIGHT = 0;
	#DAMAGE = 0;
	#PRECISION = 0;
	#MUNITIONS;
	#EFFECTS = { None: "Aucun effet" };
	//#endregion
	//#region Constructeur
	constructor(
		{
			Nom = this.#NOM,
			Type = this.#TYPE,
			Hand = this.#HAND,
			Weight = this.#WEIGHT,
			Damage = this.#DAMAGE,
			Precision = this.#PRECISION,
			Effects = this.#EFFECTS,
		} = {}
		//#endregion
		//#region Variables appliquées au constructeur
	) {
		//Nom
		this.#NOM = Nom;
		//Type
		this.#TYPE = Type;
		//Arme à ... mains
		this.#HAND = Hand;
		//Poids
		this.#WEIGHT = Weight;
		//Dégâts
		this.#DAMAGE = Damage;
		//Précision de l'arme
		this.#PRECISION = Precision;
		//Nombre de Munitions de l'arme
		if (["Arc", "Fusil", "Pistolet"].includes(this.#TYPE)) {
			switch (this.#TYPE) {
				case "Arc":
					this.#MUNITIONS = { Chargeur: 1, Reserve: 30, Recharge: 1 };
					break; //Arcs, ...
				case "Fusil":
					this.#MUNITIONS = { Chargeur: 1, Reserve: 20, Recharge: 1 };
					break; //Fusils, ...
				case "Pistolet":
					this.#MUNITIONS = { Chargeur: 6, Reserve: 30, Recharge: 1 };
					break; //Revolvers, Pistolets, ...
				default:
					this.#MUNITIONS = { Chargeur: 0, Reserve: 0, Recharge: 1 };
					break;
			}
		}
		//Effects
		this.#EFFECTS = Effects;
	}
	//#endregion
	//#region Fonctions utilisables sur l'arme
	//Obtenir le Nom
	get Nom() {
		return this.#NOM;
	}
	//Obtenir le Type
	get Type() {
		return this.#TYPE;
	}
	//Obtenir le Nombre de main utilisé par l'arme
	get Hand() {
		return this.#HAND;
	}
	//Obtenir le Poids
	get Weight() {
		return this.#WEIGHT;
	}
	//Obtenir les Dégâts
	get Damage() {
		return this.#DAMAGE;
	}
	//Obtenir la Précision
	get Precision() {
		return this.#PRECISION;
	}
	//Obtenir le nombre de Munitions
	get Munitions() {
		if (typeof this.#MUNITIONS !== "undefined") {
			return this.#MUNITIONS;
		}
	}
	//Modifier le nombre de Munitions
	set Munitions(value) {
		try {
			if (value == "reload") {
				if (this.#MUNITIONS.Reserve == 0) throw "Insufficent Ammo";
				else {
					recharge = this.#MUNITIONS.Recharge - this.#MUNITIONS.Chargeur;
					if (this.#MUNITIONS.Reserve < recharge) {
						this.#MUNITIONS.Chargeur = this.#MUNITIONS.Reserve;
						this.#MUNITIONS.Reserve = 0;
					} else {
						this.#MUNITIONS.Chargeur += recharge;
						this.#MUNITIONS.Reserve -= recharge;
					}
				}
			} else if (typeof value != "number") throw "Bad type";
			else if (!Number.isInteger(value)) throw "Not a positive integer";
			else if (this.#MUNITIONS.Chargeur < value) {
				throw "Insufficent Ammo";
			} else {
				this.#MUNITIONS.Chargeur = value;
			}
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : Nombre || Donné :", typeof value);
			} else if (err == "Not a positive integer")
				console.log("La valeur ne peut pas être négative ou à virgule.");
			else if (err == "Insufficent Ammo") {
				console.log(
					"Vous n'avez pas assez de munitions dans le chargeur pour faire cette action"
				);
			}
		}
	}
	//Obtenir les Effets
	get Effects() {
		var objectEffect = {};
		for (var key in this.#EFFECTS) {
			objectEffect[key] = this.#EFFECTS[key];
		}
		return objectEffect;
	}
	//#endregion
}

//ARMURES
//-------------------------------------------------
class Armures {
	//#region Caractéristiques privées de base
	#NOM = "Aucune";
	#TYPE = "None";
	#WEIGHT = 0;
	#RES = { PHY: 0, MEN: 0, OTHERS: { None: "None" } };
	#EFFECTS = { None: "Aucun effet" };
	//#endregion
	//#region Constructeur
	constructor(
		{
			Nom = this.#NOM,
			Type = this.#TYPE,
			Weight = this.#WEIGHT,
			Res = this.#RES,
			Effects = this.#EFFECTS,
		} = {}
		//#endregion
		//#region Variables appliquées au constructeur
	) {
		//Nom
		this.#NOM = Nom;
		//Type
		this.#TYPE = Type;
		//Poids
		this.#WEIGHT = Weight;
		//Résistances physique, mentale et autres
		this.#RES = Res;
		//Effects
		this.#EFFECTS = Effects;
	}
	//#endregion
	//#region Fonctions utilisables sur l'armure
	//Obtenir le Nom
	get Nom() {
		return this.#NOM;
	}
	//Obtenir le Type
	get Type() {
		return this.#TYPE;
	}
	//Obtenir le poids
	get Weight() {
		return this.#WEIGHT;
	}
	//Obtenir les résistances
	get Res() {
		return this.#RES;
	}
	//Obtenir les effets
	get Effects() {
		var objectEffect = {};
		for (var key in this.#EFFECTS) {
			objectEffect[key] = this.#EFFECTS[key];
		}
		return objectEffect;
	}
	//#endregion
}

//OBJET
//-------------------------------------------------
class Objet {
	//#region Caractéristiques privées de base
	NOM = "Rien";
	QUANTITY = 1;
	REMAIN = 0;
	UNITY = "None";
	QUALITY = "None";
	WEIGHT = 0;
	DESCRIPTION = "Aucune";
	//#endregion
	//#region Constructeur
	constructor(
		{
			Nom = this.NOM,
			Quantity = this.QUANTITY,
			Remain = this.REMAIN,
			Unity = this.UNITY,
			Quality = this.QUALITY,
			Weight = this.WEIGHT,
			Description = this.DESCRIPTION
		} = {}
		//#endregion
		//#region Variables appliquées au constructeur
	) {
		//Nom
		this.NOM = Nom;
		//Quantité
		this.QUANTITY = Quantity;
		//Utilisations restantes
		if (Remain != 0) {
			this.REMAIN = Remain;
			this.UNITY = Unity;
		}
		//Qualité
		if (Quality != "None") {
			this.QUALITY = Quality;
		}
		//Poids
		this.WEIGHT = Weight;

		//Description
		if (Description != "Aucune") {
			this.DESCRIPTION = Description;
		}
	}
	//#endregion
	//#region Fonctions utilisables sur l'objet
	//Obtenir le Nom
	get Nom() {
		return this.NOM;
	}
	//Changer le Nom
	set Nom(name) {
		try {
			if (typeof name != "string") throw "Bad type";
			else if (name == "") throw "Bad length";
			else this.NOM = name;
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : String || Donné :", typeof name);
			} else if (err == "Bad length")
				console.log("Erreur : La longueur du nom donné est insuffisante.");
		}
	}

	//Obtenir la Quantité
	get Quantity() {
		return this.QUANTITY;
	}
	//Changer la Quantite
	set Quantity(qtt) {
		try {
			if (typeof qtt !== "number") throw "Bad type";
			else if (qtt < 0 || !Number.isInteger(qtt)) throw "Not a positive integer";
			else {
				this.QUANTITY = qtt;
				if (this.QUANTITY == 0) {
					delete this;
				}
			}
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : Nombre || Donné :", typeof qtt);
			} else if (err == "Not a positive integer")
				console.log("La valeur ne peut pas être négative ou à virgule.");
		}
	}

	//Obtenir le Poids
	get Weight() {
		return this.WEIGHT;
	}
	set Weight(value) {

	}

	//Obtenir le Nombre d'utilisations restantes
	get Remain() {
		try {
			if (typeof this.REMAIN !== "undefined") {
				return this.REMAIN;
			} else {
				throw "Undefined variable"
			}
		} catch (err) {
			if (err == "Undefined variable") {
				console.log("\"Remain\" n'existe pas.");
			}
		}
	}

	//Obtenir l'unité
	get Unity() {
		try {
			if (typeof this.UNITY !== "undefined") {
				return this.UNITY
			} else {
				throw "Undefined variable"
			}
		} catch (err) {
			if (err == "Undefined variable") {
				console.log("\"Unity\" n'existe pas.");
			}
		}
	}
	//Changer l'unité
	set Unity(name) {
		try {
			if (typeof name !== "string") throw "Bad type";
			else if (name == "") throw "Bad length";
			else this.UNITY = name;
		} catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : String || Donné :", typeof name);
			} else if (err == "Bad length")
				console.log("Erreur : La longueur du nom donné est insuffisante.");
		}
	}

	//Changer le Nombre d'utilisations restantes
	set Remain(qtt) {
		try {
			if (typeof qtt !== "number") throw "Bad type";
			else if (qtt < 0) throw "Not a positive number"
			else {
				this.REMAIN = qtt;
				if (this.REMAIN == 0) {
					this.QUANTITY -= 1;
				}
			}
		}
		catch (err) {
			if (err == "Bad type") {
				console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
				console.log("Demandé : Nombre || Donné :", typeof qtt);
			} else if (err == "Not a positive number") {
				console.log("La valeur ne peut pas être négative.");
			}
		}
	}

	//Obtenir l'unité
	get Unity() {
		try {
			if (typeof this.UNITY !== "undefined") {
				return this.UNITY;
			} else {
				throw "Undefined variable"
			}
		} catch (err) {
			if (err == "Undefined variable") {
				console.log("\"Unity\" n'existe pas.");
			}
		}
	}

	//Obtenir la Qualité
	get Quality() {
		try {
			if (typeof this.QUALITY !== "undefined") {
				return this.QUALITY;
			} else {
				throw "Undefined variable"
			}
		} catch (err) {
			if (err == "Undefined variable") {
				console.log("\"Quality\" n'existe pas.");
			}
		}
	}
	//Obtenir la Description
	get Description() {
		try {
			if (typeof this.DESCRIPTION !== "undefined") {
				return this.DESCRIPTION;
			} else {
				throw "Undefined variable"
			}
		} catch (err) {
			if (err == "Undefined variable") {
				console.log("\"description\" n'existe pas.");
			}
		}
	}
	//#endregion
}

//INVENTAIRE
//-------------------------------------------------
class Inventaire {
	//#region Caractéristiques privées de base
	ITEMS = {};

	//#endregion
	//#region Constructeur
	constructor({ Items = this.ITEMS } = {}) {

		//Objets
		if (Items == {}) {
			this.ITEMS = {item1: new Objet()}
		} else {
			for (var key in Items) {
				//Nom, Quantité et Poids (Nécessaire)
				this.ITEMS[key] = {
					Nom: Items[key].Nom,
					Quantity: Items[key].Quantity,
					Weight: Items[key].Weight
				}
				//Nombre d'utilisations multiple ?
				if (typeof Items[key].Remain !== "undefined") {
					this.ITEMS[key].Remain = Items[key].Remain
					this.ITEMS[key].Unity = Items[key].Unity
				}
				//Qualité du produit ?
				if (typeof Items[key].Quality !== "undefined") {
					this.ITEMS[key].Quality = Items[key].Quality
				}
				//Description ?
				if (typeof Items[key].Description !== "undefined") {
					this.ITEMS[key].Description = Items[key].Description
				}
			}
		}
	}

	//#endregion
	//#region Fonctions utilisables sur l'inventaire
	//Obtenir les Objets
	get Items() {
		objectItems = {}
		for (var key in this.ITEMS) {
			objectItems[key] = Items[key];
		}
		return objectItems;
	}
	//Ajouter un Objet
	addItem() {
	}
	//Retirer un Objet
	removeItem() {

	}
	//#endregion
}

//PERSONNAGE
//-------------------------------------------------
class Personnage {
	//#region Caractéristiques privées de base
	#NOM = "Charlie";
	#PV;
	#LVL = 1;
	#WEIGHT;
	#MONEY = 1000;

	#STATS = new Stats();
	#WEAPONS = new Armes();
	#ARMORS = new Armures();
	#INV = new Inventaire();
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
			if (typeof Weapons[key].Effects["None"] === "undefined") {
				this.#WEAPONS[key]["Effects"] = Weapons[key].Effects;
			}
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
			if (typeof Armors[key].Effects["None"] === "undefined") {
				this.#ARMORS[key]["Effects"] = Armors[key].Effects;
			}
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
						P.#WEIGHT["Inventaire"] += P.#INV[key]["Weight"];
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
			objectInv[key] = this.#INV[key]
		}
		return objectInv;
	}
	//#endregion
}

exports.Stats = Stats;
exports.Armes = Armes;
exports.Armures = Armures;
exports.Objet = Objet;
exports.Inventaire = Inventaire;
exports.Personnage = Personnage;