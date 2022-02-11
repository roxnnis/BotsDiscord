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
			console.log("je suis appelé");
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

exports.Armes = Armes;