//Classes

const { UserFlags } = require("discord.js");

//STATS
//-------------------------------------------------
class Stats {
  //Statistiques privées
  #PHY = 0;
  #MEN = 0;
  #INT = 0;
  #SOC = 0;
  #CHA = 0;

  //Constructeur
  constructor(
    physique = this.#PHY,
    mental = this.#MEN,
    intelligence = this.#INT,
    social = this.#SOC,
    chance = this.#CHA
  ) {
    this.#PHY = physique;
    this.#MEN = mental;
    this.#INT = intelligence;
    this.#SOC = social;
    this.#CHA = chance;
  }

  //Obtenir les statistiques
  getPhy() {
    return this.#PHY;
  }
  getMen() {
    return this.#MEN;
  }
  getInt() {
    return this.#INT;
  }
  getSoc() {
    return this.#SOC;
  }
  getCha() {
    return this.#CHA;
  }
}

//PERSONNAGE
//-------------------------------------------------
class Personnage {
  //Caractéristiques privées
  #NOM = "Charlie";
  #PV;
  #LVL = 1;
  #POIDS;
  #MONEY;

  #STATS = new Stats();
  #WEAPONS = { Arme1: { Nom: "Aucune", Poids: 12 } };
  #ARMORS = { Armure1: { Nom: "Aucun", Poids: 6 } };
  #DCM = "Aucun";
  #INV;

  constructor(
    Nom = this.#NOM,
    Niveau = this.#LVL,
    Stats = this.#STATS,
    Armes = this.#WEAPONS,
    Armures = this.#ARMORS,
    DCM = this.#DCM
  ) {
    //Nom
    this.#NOM = Nom;

    //Niveau
    this.#LVL = Niveau;

    //Poids
    this.#POIDS = 0;

    //Argent
    this.#MONEY = 0;

    //Statistiques
    this.#STATS = {
      PHY: Stats.getPhy(),
      MEN: Stats.getMen(),
      INT: Stats.getInt(),
      SOC: Stats.getSoc(),
      CHA: Stats.getCha(),
    };

    //Calcul des PV
    if (this.#STATS["PHY"] != 0 || this.#STATS["MEN"] != 0)
      this.#PV = {
        Actuel: this.#STATS["PHY"] * 2 + this.#STATS["MEN"],
        Total: this.#STATS["PHY"] * 2 + this.#STATS["MEN"],
      };
    else this.#PV = { Actuel: 1, Total: 1 };

    //Armes et Armures
    this.#WEAPONS = [];
    this.#ARMORS = [];

    for (var key in Armes) {
      this.#WEAPONS.push(Armes[key]);
      //Ajout du poids de l'arme
      this.#POIDS += Armes[key]["Poids"];
    }

    for (var key in Armures) {
      this.#ARMORS.push(Armures[key]);
      //Ajout du poids de l'armure
      this.#POIDS += Armures[key]["Poids"];
    }

    //DCM
    this.#DCM = DCM;

    //Inventaire
    this.#INV = {
      Slot1: {
        Nom: "Corde",
        Quantite: 1,
        Reste: 14,
        Poids: 14,
        Description: "Une jolie corde :D",
      },
    };

    //Ajout du poids de l'inventaire
    for (var key in this.#INV) {
      if (this.#INV[key]["Poids"] != undefined) {
        this.#POIDS += this.#INV[key]["Poids"];
      }
    }
  }

  //Obtenir le nom
  getNom() {
    return this.#NOM;
  }

  //Changer le nom
  editNom(name) {
	try{
		if(typeof name != "string") 
			throw "Bad type" 
		else if (name == "") 
			throw "Bad length"
		else
			return this.#NOM = name.substring(0,31);
	} catch(err) {
		if (err == "Bad type")
			console.log("Erreur : Mauvais type de variable d'entrée indiqué.");
		else if (err == "Bad length")
			console.log("Erreur : La longueur du nom donné est insuffisante.");
	}
  }

  //Obtenir le niveau
  getLVL() {
    return this.#LVL;
  }

  //Obtenir le poids
  getPoids() {
    return this.#POIDS;
  }

  //Obtenir les PV
  getPV(type = "All") {
    if (type === "Actuel") return {Actuel:this.#PV.Actuel};
    else if (type === "Total") return {Total:this.#PV.Total};
    else if (type === "All") return {Actuel:this.#PV.Actuel, Total:this.#PV.Total}
  }

  //Obtenir l'argent
  getMoney() {
    return this.#MONEY;
  }

  //Obtenir les Stats
  getStats() {
    return {
      PHY: this.#STATS["PHY"],
      MEN: this.#STATS["MEN"],
      INT: this.#STATS["INT"],
      SOC: this.#STATS["SOC"],
      CHA: this.#STATS["CHA"],
    };
  }
}

exports.Stats = Stats;
exports.Personnage = Personnage;
