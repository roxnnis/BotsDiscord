//Classes

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
      this.#PV = {"Actuel":this.#STATS["PHY"] * 2 + this.#STATS["MEN"], "Total":this.#STATS["PHY"] * 2 + this.#STATS["MEN"]};
    else this.#PV = 1;

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

  //Afficher le nom
  getName() {
    console.log(`Nom du personnage : ${this.#NOM}`);
  }

  //Afficher le poids
  getPoids() {
    console.log(`Poids du personnage : ${this.#POIDS}kg`);
  }

  //Afficher les PV
  getPV() {
	console.log(`Points de Vie du personnage : ${this.#PV} / ${this.#PV}`);
  }

  //Afficher les Stats
  getStats() {
    console.log("Statistiques du personnage : ");
    console.log();
    
    console.log("Physique      | ", this.#STATS["PHY"]);
    console.log("Mental        | ", this.#STATS["MEN"]);
    console.log("Intelligence  | ", this.#STATS["INT"]);
    console.log("Social        | ", this.#STATS["SOC"]);
    console.log("Chance        | ", this.#STATS["CHA"]);
  }
}

exports.Stats = Stats;
exports.Personnage = Personnage;
