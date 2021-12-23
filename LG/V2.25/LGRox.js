// BOT CONFIGURATION
// Contain Token
const fs = require('fs');
const S = fs.readFileSync("../../BotConfig.json");
var SettBot = JSON.parse(S);


var fichier = fs.readFileSync("./JSON/Config.json");
var fichier2 = fs.readFileSync("./JSON/Composition.json");

var Config = JSON.parse(fichier);
var Composition = JSON.parse(fichier2);

//JS
const LG_Commands = require('./LG_Commands.js');

//Exports
exports.Config = Config;
exports.Composition = Composition;
exports.fs = fs;
///////////////////////////////////////////////////////////////////

//Déclaration des variables globales
var messageCommande;
////////////////////////////////////

//Pré-config de parties
var PACKS =
{
	BASE: ["Loup-Garou", "Loup-Garou", "Voyante", "Sorcière", "Salvateur", "Chasseur"],
	CARNAGE: ["Loup-Garou", "Loup-Garou", "Cupidon", "Empoisonneuse", "Salvateur", "Chasseur"],
	COMPO8: ["Loup-Garou", "Loup-Garou", "Voyante", "Sorcière", "Cupidon", "Chasseur", "Simple Villageois", "Petite Fille"],
	COMPO9: ["Loup-Garou", "Loup-Garou", "Enfant Sauvage", "Voyante", "Sorcière", "Cupidon", "Chasseur", "Simple Villageois", "Petite Fille"],
	COMPO10: ["Loup-Garou", "Loup-Garou", "Loup-Garou", "Voyante", "Sorcière", "Cupidon", "Chasseur", "Simple Villageois", "Petite Fille", "Salvateur"],
	COMPO11: ["Loup-Garou", "Loup-Garou", "Infecte Père des loups", "Voyante", "Cupidon", "Sorcière", "Salvateur", "Chasseur", "Simple Villageois", "Idiot du Village", "Petite Fille"],
	COMPO12: ["Loup-Garou", "Loup-Garou", "Infecte Père des loups", "Sœur", "Sœur", "Ancien", "Voleur", "Petite Fille", "Idiot du Village", "Chasseur", "Voyante", "Sorcière", "Salvateur", "Cupidon"]
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//Setup Bot (Assist-o-Bot)
const { Client, Intents } = require('discord.js');
const bot = new Client({
	intents: [
	  Intents.FLAGS.GUILDS,
	  Intents.FLAGS.GUILD_MESSAGES,
	  Intents.FLAGS.GUILD_MEMBERS,
	  Intents.FLAGS.GUILD_PRESENCES,
	  Intents.FLAGS.DIRECT_MESSAGES
	],
  });
bot.login(SettBot.Token);
//////////////////////////////////////////


LG_Commands.Clear(); //Reset des paramètres de partie (sécurité)


bot.on('message', function (message) {
	if (LG_Commands.Detection(message)) return;

	//Choix du salon
	if (message.content.toLowerCase() == SettBot.Prefix+"salon") {
		if (message.author.username == 'Roxnnis') {
			LG_Commands.Salon(message)
		} else {
			message.channel.send("Vous n'avez pas la permission de changer le salon.");
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////

	//Reset de la game
	if (message.content.toLowerCase() == SettBot.Prefix+"reset" && message.author.username == 'Roxnnis') {
		if (message.author.username == 'Roxnnis') {
			LG_Commands.Clear();
			message.channel.send("La partie vient d'être réinitialisée.");
		} else {
			message.channel.send("Vous n'avez pas la permission de relancer la partie.");
		}
	}
	/////////////////////////////////////////////////////////////////////////////////////////


})
//Descriptions des rôles (Désactivée ATM car j'ai pas que ça à faire)

/*const json = require('./Descriptions.json');
const descriptions = JSON.parse(json);*/

/*function descript(rolle)
	{
		if (new Map(descriptions).has(rolle)) {
			let associe = new Map(descriptions).get(rolle);
			return associe
		}
	}
*/

//Start : Demande de join
bot.on('message', function (message) {
	if (LG_Commands.Detection(message)) return;
	if (!message.content.toLowerCase().startsWith(SettBot.Prefix+"start")) return;
	if (Config['state'] != 0) return;
	if (message.author.username != 'Roxnnis') {
		message.channel.send("Vous n'avez pas la permission de lancer la partie.");
		return;
	}
	Config['gamemaster'] = message.author.id;
	message.channel.send("Faites //join pour rejoindre la partie de Loup-Garou.")
	Config['state'] = 1;
	fs.writeFileSync("./JSON/Config.json", JSON.stringify(Config));
})

//Start : //join rajoute la personne dans la partie
bot.on('message', function (message) {
	if (LG_Commands.Detection(message)) return;
	if (Config['state'] != 1) return;
	if (message.content.toLowerCase() == SettBot.Prefix+"join") {
		if (Composition['players'].indexOf(message.author) != -1) return;
		Composition['players'].push(message.author); Composition['nbJoueursPartie']++; message.channel.send(message.author.username + " vient de rejoindre la partie.");
	}
})

//Membres : Voir la liste des joueurs
bot.on('message', function (message) {
	if (LG_Commands.Detection(message)) return;
	if (message.content == SettBot.Prefix+"membres") {
		membres = ""
		for (var i = 0; i < Composition['players'].length; i++) {
			membres += Composition['players'][i].username + "\n";
		}
		message.channel.send(`__Voici les membres de la partie__ :\r\n${membres}`);
	}
})



//Permet d'afficher les commandes disponibles
function AfficheCommandes(message) {
	if (LG_Commands.Detection(message)) return;
	message.channel.send("__**LISTE DES COMMANDES POSSIBLES**__\r\n\r\n   **//compo** : Permet de configurer la composition de la partie\r\n  __Paramètres__ :\r\n\r\n``START`` **>>** Permet de commencer à configurer la partie (Condition : \"//join\" en cours)\r\n\``ADD`` ``ROLE=QUANTITÉ\_ROLE`` **>>** Ajoute un nombre défini du rôle donné en paramètre\r\n``GRADD`` ``ID\_GROUPE`` ``NOM\_ROLE=NB\_ROLE`` **>>** Permet d'ajouter un groupe privé de personnes (Loup [OK], Couple [OFF])\r\n``PACK`` ``NOM\_PACK`` **>>** Ajoute le pack de rôle demandé (Voir liste des pack [OFF]).");
}

//help : Affiche les commandes
bot.on('message', function (message) {
	if (LG_Commands.Detection(message)) return;
	if (message.content != SettBot.Prefix+"help") return;
	AfficheCommandes(message)
})


//Compo : Permet de gérer la partie
bot.on('message', function (message) {
	if (LG_Commands.Detection(message)) return;
	if (message.author.id != Config['gamemaster']) {
		message.channel.send("Vous n'avez pas la permission de modifier la composition");
		return;
	}
	messageCommande = message.content.toLowerCase().split(" ");

	if (messageCommande[1] == "start") {
		Config['state'] = 2;
		message.channel.send(`Nombre de joueurs : ${Composition['nbJoueursPartie']}`);
		AfficheCommandes(message);
	}
	if (Config['state'] == 2) {
		if (messageCommande[0] != SettBot.Prefix+"compo") return;

		//Add : Ajoute un rôle de la compo
		if (messageCommande[1] == "add") {
			var info = messageCommande[2].split("=");
			for (var i = 0; i < info[1]; i++) {
				Composition['listeRole'].push(info[0]);
			}
			message.channel.send("Le rôle " + info[0] + " vient d'être ajouté " + i + " fois.");
		}

		//Gradd : Groupe un type de rôle //gradd Cupidon 
		if (message.content.toLowerCase().slice(8).startsWith("gradd")) {
			if (message.content.toLowerCase().slice(14).startsWith("1")) {
				if (Composition['group'].indexOf("Loup-Garou") == -1) {
					Composition['group'].push("Loup-Garou");
					message.channel.send("Le groupe Loup-Garou vient d'être ajouté.");
				}
			}

			if (message.content.toLowerCase().slice(14).startsWith("2")) {
				if (Composition['group'].indexOf("Cupidon") == -1) {
					Composition['group'].push("Cupidon");
					message.channel.send("Le groupe Cupidon vient d'être ajouté.");
				}
			}
			var info = message.content.slice(16).split("=");
			for (var i = 0; i < info[1]; i++) {
				Composition['listeRole'].push(info[0]);
			}


		}
		//Pack : Pré-config ici
		else if (message.content.toLowerCase().slice(8).startsWith("pack")) {
			var TestPack = message.content.toUpperCase().slice(13);
			if (TestPack in PACKS) {
				for (var i = 0; i < PACKS[TestPack].length; i++) {
					RolePack = PACKS[TestPack];
					Composition['listeRole'].push(RolePack[i]);
				}
			}
		}
		//Del : Supprime un rôle de la compo
		else if (message.content.toLowerCase().slice(8).startsWith("del")) {
			var info = message.content.slice(12);
			var i = 0;
			while (i < Composition['listeRole'].length) {
				if (Composition['listeRole'][i] == info) {
					Composition['listeRole'].splice(i, 1);
					i--;
				}
				i++;
			}
			message.channel.send("Le rôle " + info + " vient d'être supprimé de la composition.")
		}
		//Alldel : Supprime entièrement la compo
		else if (message.content.toLowerCase().slice(8).startsWith("alldel")) {
			Composition['listeRole'] = [];
			message.channel.send("La composition de la partie vient d'être réinitialisée.");
		}
		//List : Affiche la liste des rôles
		else if (message.content.toLowerCase().slice(8).startsWith("list")) {
			var compo = "";
			for (var i = 0; i < Composition['listeRole'].length; i++) {
				compo += Composition['listeRole'][i] + "\n";
			}
			message.channel.send(`__Voici la composition de la partie__ :\r\n${compo}`);
		}
	}
})

function compte(message, listeRoles, listeJoueurs, role) {
	var res = [];
	if (listeRoles.length == listeJoueurs.length) {
		for (var i = 0; i < listeRoles.length; i++) {
			if (listeRoles[i] == role) {
				res.push(listeJoueurs[i]);
			}
		}
		return res
	}
	else {
		message.channel.send("Création du groupe " + role + " : Nombre de joueur différent du nombre de rôles.")
		return 0
	}
}

function grouping(listeJoueurs) {
	var res = [];
	for (var i = 0; i < listeJoueurs.length; i++) {
		res.push({ id: listeJoueurs[i].id, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'], })
	}
	return res
}

//Tirage : Randomize la partie et attribue les rôles aux personnes
bot.on('message', function (message) {
	if (LG_Commands.Detection(message)) return;
	if (message.content.toLowerCase() !== SettBot.Prefix+"tirage") return;
	if (Config['state'] != 2) return;
	if (Composition['players'].length != Composition['listeRole'].length) {
		message.channel.send('Le nombre de rôles (' + Composition['players'].length + ') est différent du nombre de joueurs (' + Composition['listeRole'].length + ').');
		return;
	}
	if (message.author.id != Config['gamemaster']) return;

	//Random :
	var participantsRestants = Composition['players'].slice(0);
	var users = [];
	var names = [];
	while (users.length < Composition['nbJoueursPartie']) users.push(participantsRestants.splice(Math.floor(Math.random() * participantsRestants.length), 1)[0]);
	for (let i = 0; i < users.length; i++) {
		names.push(users[i].username);
	}

	var PartieBotGM = [{ id: Config['gamemaster'], allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'] }, { id: '601836762008125460', allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'] }, { id: Config['everyone'], deny: ['VIEW_CHANNEL'] }];
	var PartieLoups = grouping(compte(message, Composition['listeRole'], users, "Loup-Garou"));
	var GroupeLoups = PartieBotGM.concat(PartieLoups);

	//Distribution :
	for (let i = 0; i < Composition['nbJoueursPartie']; i++) {
		users[i].send(`Rôle : ${Composition['listeRole'][i]}`);
		bot.users.cache.get(Config['gamemaster']).send(`${users[i].username} est ${Composition['listeRole'][i]}`);
	}

	if (Composition['group'].length != -1) {
		if (Composition['group'].includes("Loup-Garou")) {
			message.guild.createChannel('loup-garou', { type: 'channel', permissionOverwrites: GroupeLoups }).setChannelPositions(10).then(console.log).catch(console.error)
		}
		if (Composition['group'].includes("Cupidon")) {
			message.guild.createChannel('couple', { type: 'channel', permissionOverwrites: PartieBotGM }).then(console.log).catch(console.error)
		}
	}
	message.channel.send(`Le tirage est fait`);
	Config['state'] = 0;
	fs.writeFileSync("./JSON/Config.json", JSON.stringify(Config));

})