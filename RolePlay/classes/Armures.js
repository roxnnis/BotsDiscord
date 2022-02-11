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