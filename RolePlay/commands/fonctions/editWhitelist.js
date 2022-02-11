const fs = require("fs");



function WlAdd(userID, perso) {

	var rolistes = JSON.parse(fs.readFileSync("./donnees/Personnages.json"));
	var whitelist = JSON.parse(fs.readFileSync("./donnees/Whitelist.json"));

	var obj = {};

	for (var cle in rolistes) {
		if (perso !== null) {
			if (rolistes[cle].User == userID && rolistes[cle].Nom == perso) {
				if (typeof whitelist[userID] === "undefined") {
					obj[perso] = perso;
					whitelist[userID] = obj;
				} else {
					obj = whitelist[userID];
					obj[perso] = perso;
					whitelist[userID] = obj;
				}
			}
		} else {
			if (rolistes[cle].User == userID) {
				obj[rolistes[cle].Nom] = rolistes[cle].Nom;
				whitelist[userID] = obj;
			}
		}
	}
	fs.writeFileSync("./donnees/Whitelist.json", JSON.stringify(whitelist));
}


function WlDel(userID, perso) {

	var whitelist = JSON.parse(fs.readFileSync("./donnees/Whitelist.json"));

	for (var cle in whitelist) {
		if (perso !== null) {
			if (cle == userID && whitelist[cle][perso] == perso) {
				delete whitelist[cle][perso];
				if(Object.keys(whitelist[userID]).length == 0){
					delete whitelist[cle];
				}
			}
		} else {
			if(cle == userID) {
				delete whitelist[cle];
			}
		}
	}
	
	fs.writeFileSync("./donnees/Whitelist.json", JSON.stringify(whitelist));
}


exports.WlAdd = WlAdd;
exports.WlDel = WlDel;