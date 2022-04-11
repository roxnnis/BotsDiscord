//Requires
const { Message, Interaction } = require("discord.js");

//Constantes
const { trusted } = require("../data/id.json");
const { gamemaster } = require("../data/config.json");

/**
 * #### Vérifie si une action doit être écartée ou non.
 * @param {Message|Interaction} action Le message | L'interaction
 * @param {number} [authority=0] Niveau d'autorité nécessaire
 * - 0 : Toutes les actions sont acceptées
 * - 1 : Seules les actions des personnes de confiance sont acceptées
 * - 2 : Seules les actions du maître de partie sont acceptées
 * @return {boolean} ```boolean``` Écarter l'action ou non
 */
exports.check = function (action,authority=0) {
	const usr = action.user;
	var res = false;
	switch(authority){
		case 2: res = usr.id != gamemaster;
		case 1: 
		if(!res) {
			res = true;
			for(let key in trusted){
				if(trusted[key] == usr.id){
					res = false;
				}
			}
		}
		default: res = res || usr.bot;
	}
	return res;
}