//JSON
const fs = require('fs');
const f = fs.readFileSync("./var.json");
var varJson = JSON.parse(f);

// BOT CONFIGURATION
// Contain Token
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

const { Client, Intents } = require("discord.js"); 
const { stringify } = require('querystring');
bot = new Client(
	{ 
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
	});

bot.login(SettBot.Token); // Initialisation du bot

// Jeu en cours : Cluedo
bot.on('ready', () => {
	bot.user.setActivity('organiser un Cluedo.');
})


//Conditions rejette un message dans le mauvais salon ou du bot de continuer.
function Conditions(message) {
	return message.author.bot || message.channel.id != (varJson.salons.commande);
}

// Créer une composition
bot.on("message", function (message) {
	if (Conditions(message) || !message.content.startsWith(SettBot.Prefix + "composition")) { } else {
		if (!varJson.AuthorisedUsers.includes(message.author.id)) {
			message.channel.send("Vous ne possédez pas les permissions nécessaires pour effectuer cette commande.");
		}
		else {
			let mes = message.content.split('  '); //Récupère les 3 parties du message (note ci-dessous)
			if (!mes.length == 3) //Commande + Nom du Groupe + Cartes
			{
				message.channel.send("__Vous n'avez pas donné assez de paramètres__\r\nConstruction : //composition␣␣<nom>␣␣<Perso1/.../Perso6/Arme1/.../Arme6/Lieu1/.../Lieu9> (oubliez pas de respecter les espaces et /)");
			}
			else {
				let composantes = mes[2].split('/'); //Récupère les différentes cartes

				if (!composantes.length == 21) //Bon nombre de cartes
				{
					message.channel.send("__Il manque des arguments ou il y a trop d'arguments pour les cartes__\r\nConstruction : //composition␣␣<nom>␣␣<Perso1/.../Perso6/Arme1/.../Arme6/Lieu1/.../Lieu9> (oubliez pas de respecter les espaces et /)");
				}
				else {
					varJson['cartes'][mes[1]] =
						[
							[composantes[0], composantes[1], composantes[2], composantes[3], composantes[4], composantes[5]], //Persos
							[composantes[6], composantes[7], composantes[8], composantes[9], composantes[10], composantes[11]], //Armes
							[composantes[12], composantes[13], composantes[14], composantes[15], composantes[16], composantes[17], composantes[18], composantes[19], composantes[20]] //Lieux
						];
					fs.writeFileSync("./var.json", JSON.stringify(varJson));
				}
			}
		}
	}
})
// Fin : Créer une composition


//Lancer une partie
let PartieLancee = false;
let messageID;
let joueurs = [];

bot.on('message', function (message) {
	if (Conditions(message) || !message.content.startsWith(SettBot.Prefix + "start")) { } else {
		if (varJson.AuthorisedUsers.includes(message.author.id)) {
			if (!PartieLancee) {
				message.channel.send("Lancement d'une partie de Cluedo 🔎\r\nPour participer, cliquez sur la loupe").then(message => {
					message.react('🔎');
					messageID = message.id;
				});
				PartieLancee = true;
			} else {
				message.channel.send("La partie est déjà lancée.");
			}
		} else {
			message.channel.send("Vous ne possédez pas les permissions nécessaires pour effectuer cette commande.");
		}
	}
})
//Fin : Lancer une partie


//Récupération des joueurs
bot.on('messageReactionAdd', (reaction, user) => {
	if (user.id == bot.user.id || !PartieLancee || reaction.message.id != messageID) { } else {
		if (reaction.emoji.name === "🔎") {
			if (joueurs.indexOf(user) == -1 && joueurs.length < 6) // Limitation à 6 joueurs
			{
				joueurs.push(user);
				reaction.message.channel.send("Le joueur **" + user.username + "** a rejoint la partie.");
			}
		}
	}
});

// bot.on('messageCreate', function(message){
// 	if(Conditions(message) || !message.content.startsWith(SettBot.Prefix + "roll")) 
// 	{ } 
// 	else 
// 	{
// 		if (!PartieLancee) { 
// 			message.channel.send("Vous avez lancé un : " + toString(Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6)));
// 		} else {
// 			message.channel.send('La partie n\'a pas encore commencée.');
// 		}
// 	}
// 	});

// bot.on('interactionCreate', async interaction => {
// 	if (!interaction.isCommand() && !varJson.AuthorisedUsers.includes(interaction.author.id) && !PartieLancee) return;

// 	if (interaction.commandName === 'start') {
// 		const row = new MessageActionRow()
// 			.addComponents(
// 				new MessageButton()
// 					.setCustomId('primary')
// 					.setLabel('Rejoindre la partie')
// 					.setStyle('PRIMARY'),
// 			);
// 				PartieLancee = True;
// 		await interaction.reply({components: [row,row] });
// 	}
// });
// //Fin : Récupération des joueurs


//Débuter la partie
bot.on('message', function (message) {
	if (Conditions(message) || !message.content.startsWith(SettBot.Prefix + "lancer") || !PartieLancee) { } else {
		if (!varJson.AuthorisedUsers.includes(message.author.id)) {
			message.channel.send("Vous ne possédez pas les permissions nécessaires pour effectuer cette commande.");
		}
		else {
			if (joueurs.length < 3) {
				message.channel.send("__Le nombre de joueurs est insuffisant (Minimum 3 joueurs).__");
			}
			else {
				let cartes = message.content.split('  '); //Récupère le bon paquet de carte
				if (cartes.length != 2) {
					message.channel.send("__Vous n'avez pas donné assez de paramètres__\r\nConstruction : /lancer␣␣<nom>");
				}
				else {
					if (varJson['cartes'][cartes[1]] == null) {
						message.channel.send("Le paquet de carte n'existe pas.");
					}
					else {
						let Persos = varJson['cartes'][cartes[1]][0];
						let Armes = varJson['cartes'][cartes[1]][1];
						let Lieux = varJson['cartes'][cartes[1]][2];

						let Perso = Persos[Math.floor(Math.random() * 6)];
						let Arme = Armes[Math.floor(Math.random() * 6)];
						let Lieu = Lieux[Math.floor(Math.random() * 9)];

						Persos.splice(Persos.indexOf(Perso), 1);
						Armes.splice(Armes.indexOf(Arme),1);
						Lieux.splice(Lieux.indexOf(Lieu),1);

						message.member.guild.channels.cache.get(varJson.salons.reponse).send("||Nom du Tueur : " + Perso + "||\r\n||Nom de l'Arme : " + Arme + "||\r\n||Nom du Lieu : " + Lieu + "||");

						let ListeCartes = Persos.concat(Armes);
						ListeCartes = ListeCartes.concat(Lieux);
						

						let limiteMain = 0;
						switch(joueurs.length)
						{
							case 3: limiteMain = 6; break;
							case 4: limiteMain = 4; break;
							case 5: limiteMain = 3; break;
							case 6: limiteMain = 3; break;
							default: limiteMain = 18; break;
						}

						for (var i = 0; i < joueurs.length; i++) {
							if (joueurs.length > 3 && joueurs.length < 6) {
								if (i == 2) {
									limiteMain += 1;
								}
							}
							random4 = [];
							while (ListeCartes.length > 0 && random4.length < limiteMain)
								random4.push(ListeCartes.splice(Math.floor(Math.random() * ListeCartes.length), 1)[0]);
							joueurs[i].send(`Cartes : ${random4}`);
						}
					}
					
				}
			}
		}
	}
})