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
  constructor({
    phy = this.#PHY,
    men = this.#MEN,
    int = this.#INT,
    soc = this.#SOC,
    cha = this.#CHA,
  } = {}) {
    this.#PHY = phy;
    this.#MEN = men;
    this.#INT = int;
    this.#SOC = soc;
    this.#CHA = cha;
  }

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
}

//PERSONNAGE
//-------------------------------------------------
class Personnage {
  //Caractéristiques privées de base
  #NOM = "Charlie";
  #PV;
  #LVL = 1;
  #POIDS;
  #MONEY = 1000;

  #STATS = new Stats();
  #WEAPONS = { Arme1: { Nom: "Aucune", Poids: 12 } };
  #ARMORS = { Armure1: { Nom: "Aucun", Poids: 6 } };
  #DCM = "Aucun";
  #INV = {
    Slot1: "vide",
  };

  constructor({
    Nom = this.#NOM,
    LVL = this.#LVL,
    Money = this.#MONEY,
    Stats = this.#STATS,
    Weapons = this.#WEAPONS,
    Armors = this.#ARMORS,
    DCM = this.#DCM,
    INV = this.#INV,
  } = {}) {
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

    //Armes et Armures
    this.#WEAPONS = [];
    this.#ARMORS = [];

    //Récupérer les armes
    for (var key in Weapons) {
      this.#WEAPONS.push(Weapons[key]);
    }

    //Récupérer les armures
    for (var key in Armors) {
      this.#ARMORS.push(Armors[key]);
    }

    //DCM
    this.#DCM = DCM;

    //Inventaire
    this.#INV = INV;

    //Calcul du poids
    var calculPoids = function (type, P) {
      if (type == "Armes" || type == "All") {
        P.#POIDS["Armes"] = 0;
        for (var key in P.#WEAPONS) {
          P.#POIDS["Armes"] += P.#WEAPONS[key]["Poids"];
        }
      }
      if (type == "Armures" || type == "All") {
        P.#POIDS["Armures"] = 0;
        for (var key in P.#ARMORS) {
          P.#POIDS["Armures"] += P.#ARMORS[key]["Poids"];
        }
      }
      if (type == "Inventaire" || type == "All") {
        P.#POIDS["Inventaire"] = 0;
        for (var key in P.#INV) {
          if (P.#INV[key]["Poids"] != undefined) {
            P.#POIDS["Inventaire"] += P.#INV[key]["Poids"];
          }
        }
      }
      P.#POIDS["Total"] =
        P.#POIDS["Armes"] + P.#POIDS["Armures"] + P.#POIDS["Inventaire"];
    };

    //Poids (Initialisation)
    this.#POIDS = { Total: 0, Armes: 0, Armures: 0, Inventaire: 0 };

    //Calcul du poids de l'inventaire
    calculPoids("All", this);
  }

  // -------------------------------------------
  // | Fonctions utilisables sur un personnage |
  // -------------------------------------------

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
  get Poids() {
    return this.#POIDS;
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

  modifyStats(stat,value=0){
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
}


exports.Stats = Stats;
exports.Personnage = Personnage;
