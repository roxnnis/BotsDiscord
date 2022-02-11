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

exports.Stats = Stats;