class Shops {
	//#region Caractéristiques privées de base
	#ARMES = {};
	#ARMURES = {};
	#DCM = {};
	#CONSOMMABLES = {};
	//#endregion
	//#region Constructeur
	constructor(
		{
			Armes = this.#ARMES,
			Armures = this.#ARMURES,
			Dcm = this.#DCM,
			Consommable = this.#CONSOMMABLES
		} = {}
		//#endregion 
	//#region Variables appliquées au constructeur
	) {
		this.#ARMES = Armes;
		this.#ARMURES = Armures;
		this.#DCM = Dcm;
		this.#CONSOMMABLES = Consommable;
	}
	//#endregion
	//#region Fonctions utilisables sur la boutique
	// Armes ___
	get ShopArmes() {
		var dicoArmes = {};
		for (var key in this.#ARMES) {
			dicoArmes[key] = this.#ARMES[key];
		}
		return dicoArmes;
	}
	// Shop add Item options
	set ShopArmes(arme) {
		this.#ARMES[arme.Nom] = {
			Objet: new Armes({
				Nom: arme.Objet.Nom,
				Type: arme.Objet.Type,
				Hand: arme.Objet.Hand,
				Weight: arme.Objet.Weight,
				Damage: arme.Objet.Damage,
				Munitions: arme.Objet.Munitions,
				Precision: arme.Objet.Precision
			}), Prix: arme.Prix
		};
	}
	// Armures ___
	get ShopArmures() {
		var dicoArmures = {};
		for (var key in this.#ARMURES) {
			dicoArmures[key] = this.#ARMURES[key];
		}
		return dicoArmures;
	}
	set ShopArmures(armure) {
		var tempo = armure.Objet.Nom;
		this.#ARMURES[tempo] = { tempo : {
			Objet: new Armures({
				Nom: armure.Objet.Nom,
				Type: armure.Objet.Type,
				Weight: armure.Objet.Weight,
				Res: armure.Objet.Res,
				Effects: armure.Objet.Effects
			}), Prix: armure.Prix
		}};
	}
	// Consommable __
	get ShopObjet() {
		var dicoObjets = {};
		for (var key in this.#CONSOMMABLES) {
			dicoObjets[key] = this.#CONSOMMABLES[key];
		}
		return dicoObjets;
	}
	// objet = {Objet,Prix} obligatoire
	set ShopObjet(objet) {
		var tempo = objet.Objet.Nom;
		this.#CONSOMMABLES[tempo] = { tempo: {
			Objet: new Objet({
				Nom: objet.Objet.Nom,
				Quantity: objet.Objet.Quantity,
				Remain: objet.Objet.Remain,
				Unity: objet.Objet.Unity,
				Quality: objet.Objet.Quality,
				Weight: objet.Objet.Weight,
				Description: objet.Objet.Description
			}), Prix: objet.Prix
		}};
	}
	//#endregion
}

exports.Shops = Shops;