//Configuration du bot

//Setup Bot (Assist-o-Bot)
const Pavay = require('./pavay.json');
const { Client } = require('discord.js'), 
bot = new Client(); 
bot.login(Pavay.token);


//Identifiant du salon
const salonCommande = "725026114560458878";
// Salon 1 : 722430871327604836 //Akyas ? X
// Salon 2 : 723729997549797497 //Akyas ? X
// Salon 3 : 725026114560458878 //Motus ? 1
// Salon 4 : 689493460129939479 //Classe ? X

//embeds
const Regles = {
    embed: {
        color: '16711680',
        author: { name: 'Roxnnis', icon_url: 'https://i.imgur.com/Wg6tufx.png' },
        title: Pavay.title,
        description: Pavay.rules,
        footer: { icon_url: null, text: Pavay.pied }
    }
};


//Temps d'attende de commande
var TimerInfos = 0, TimerChangelog = 0, TimerHelp = 0, TimerScorePokemon = 0, TimerChronoPokemon, TimerScoreMotus = 0, TimerChronoMotus, Multi = 0;


//Accès JSON
const fs = require('fs');
const { resolveMx } = require('dns');
var fichier = fs.readFileSync('Scores.json');
var scores = JSON.parse(fichier);


//Partie "Grille de Jeu" //En pause
//Déclaration des variables
var segment = 0, coupe, Mot = [], joueur, typeJeu = 0;
var instances = [];
var NombresGRA = ["01", "03", "05", "07", "09", "11", "13", "15", "17", "19", "21", "23", "25", "27", "29", "31", "33", "35", "37", "39", "41", "43", "45", "47", "49", "51", "53", "55", "57", "59", "61", "63", "65", "67", "69"];
var NombresGRB = ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "62", "64", "66", "68", "70"];

//Dire un message au lancement
bot.on('ready', function (message) {
    bot.channels.get(salonCommande).send("Le bot est activé dans ce salon.");
})

bot.on('error', function (message) {
    bot.channels.get(salonCommande).send("<@306020612747427841> je viens de planter aled t'es mauvais.");
})

//Création des grilles A & B
bot.on('message', function (message) {
    if (message.content.toLowerCase() == "//grille") {
        var CopieGrilleA = NombresGRA.slice(0), CopieGrilleB = NombresGRB.slice(0);
        var GrilleAFinale, GrilleBFinale;
        var SelectionA = "", SelectionB = "";
        const ChoixA = () => CopieGrilleA.splice(Math.floor(Math.random() * CopieGrilleA.length), 1)[0];
        const ChoixB = () => CopieGrilleB.splice(Math.floor(Math.random() * CopieGrilleB.length), 1)[0];
        for (let i = 0; i < 5; i++) {
            if (i == 0) {
                for (let j = 0; j < 5; j++) {
                    if (j == 0) {
                        GrilleAFinale = SelectionA.concat('║', ChoixA());
                        GrilleBFinale = SelectionB.concat('║', ChoixB());
                    }
                    else {
                        GrilleAFinale = GrilleAFinale + SelectionA.concat('║', ChoixA());
                        GrilleBFinale = GrilleBFinale + SelectionB.concat('║', ChoixB());
                    }
                }
            }
            else {
                for (let j = 0; j < 5; j++) {
                    if (j == 0) {
                        GrilleAFinale = GrilleAFinale + SelectionA.concat('║\r\n╠══╬══╬══╬══╬══╣\r\n║', ChoixA());
                        GrilleBFinale = GrilleBFinale + SelectionB.concat('║\r\n╠══╬══╬══╬══╬══╣\r\n║', ChoixB());
                    }

                    else if (i == 4 && j == 4) {
                        GrilleAFinale = GrilleAFinale + SelectionA.concat('║', ChoixA() + "║\r\n");
                        GrilleBFinale = GrilleBFinale + SelectionB.concat('║', ChoixB() + "║\r\n");
                    }
                    else {
                        GrilleAFinale = GrilleAFinale + SelectionA.concat('║', ChoixA());
                        GrilleBFinale = GrilleBFinale + SelectionB.concat('║', ChoixB());
                    }

                }
            }
        }
        //Montre la grille :
        message.channel.send("```Grille du groupe A :\r\n╔══╦══╦══╦══╦══╗\r\n" + GrilleAFinale + "╚══╩══╩══╩══╩══╝```");
        message.channel.send("```Grille du groupe B :\r\n╔══╦══╦══╦══╦══╗\r\n" + GrilleBFinale + "╚══╩══╩══╩══╩══╝```");
    }
})


//Partie "Affiche les infos & Change logs & help"
bot.on('message', function (message) {
    //Blocage
    if (message.channel.id != salonCommande) return;
    if (message.content.toLowerCase() == "//infos") {
        //On limite la fréquence d'envoi des règles => En mp si en temps de recharge (5 minutes)
        if (TimerInfos == 1) {
            message.author.send(Regles);
        }
        else if (TimerInfos == 0) {
            message.channel.send(Regles);
            TimerInfos = 1;
            //Bloquée X ms...
            setTimeout(() => {
                // ...et quand c'est fini tu sors du coin.
                TimerInfos = 0;
            }, 300000);
        }
    }
    if (message.content.toLowerCase() == "//changelog") {
        if (TimerChangelog == 1) {
            message.author.send("Voici les changements concernant le bot :", { files: ["./Changelogs.txt"] });
        }
        else if (TimerChangelog == 0) {
            message.channel.send("Voici les changements concernant le bot :", { files: ["./Changelogs.txt"] });
            TimerChangelog = 1;
            //Bloquée X ms...
            setTimeout(() => {
                // ...et quand c'est fini tu sors du coin.
                TimerChangelog = 0;
            }, 1500000);
        }
    }
    if (message.content.toLowerCase() == "//help" || message.content.toLowerCase() == "//commands") {
        if (TimerHelp == 1) {
            message.author.send(Pavay.commands);
        }
        else if (TimerHelp == 0) {
            message.channel.send(Pavay.commands);
            TimerHelp = 1;
            //Bloquée X ms...
            setTimeout(() => {
                // ...et quand c'est fini tu sors du coin.
                TimerHelp = 0;
            }, 120000);
        }
    }
})

//Partie "Tirage aléatoire du mot"
bot.on('message', function (message) {
    //Blocage
    if (message.author.bot) return;
    if (segment == 1) return;
    if (!message.content.startsWith("//mot") && !message.content.startsWith('//pkm') && !message.content.startsWith('//pokemon')) return;
    if (message.channel.id !== salonCommande) return;

    //On bloque les réponses à la personne qui joue
    if (message.content.indexOf('all') != -1) {
        Multi = 1;
    }
    joueur = message.author;
    if (message.content.toLowerCase().startsWith("//mot")) {
        Mot = [];
        typeJeu = 1;
        var CopieMots = Pavay.mots.split(' ');
        Mot.push(CopieMots.splice(Math.floor(Math.random() * CopieMots.length), 1)[0]);
        coupe = Mot[0].split('');
        message.channel.send("Le mot à trouver est de " + Mot[0].length + " lettres.\r\nLa première lettre du mot est : **" + coupe[0] + "**");
        segment = 1;

        TimerChronoMotus = setTimeout(() => {
            if (scores['Motus'][joueur.id] == 0) {
                scores['Motus'][joueur.id] = 0;
                message.channel.send(joueur.username + " n'a pas marqué de point lors de ce tour (10 minutes écoulées)\r\nLe mot à trouver était : " + Mot[0] + "\r\n" + joueur.username + " reste à 0 point.");
            }
            else {
                scores['Motus'][joueur.id] -= 1;
                message.channel.send(joueur.username + " n'a pas marqué de point lors de ce tour (10 minutes écoulées)\r\nLe mot à trouver était : " + Mot[0] + "\r\n" + joueur.username + " vient de retomber à " + scores['Motus'][joueur.id] + " point(s) (-1 point).");
            }
            fs.writeFileSync('Scores.json', JSON.stringify(scores));
            segment = 0;
            Multi = 0;
        }, 600000)
    }
    if (message.content.toLowerCase() == "//pokemon" || message.content.toLowerCase() == "//pkm") {
        Mot = [];
        typeJeu = 2;
        var CopieMots = Pavay.pokemon.split(' ');
        Mot.push(CopieMots.splice(Math.floor(Math.random() * CopieMots.length), 1)[0]);
        coupe = Mot[0].split('');
        message.channel.send("Le mot à trouver est de " + Mot[0].length + " lettres.\r\nLa première lettre du mot est : **" + coupe[0] + "**");
        segment = 1;

        TimerChronoPokemon = setTimeout(() => {
            if (scores['Pokemon'][joueur.id] == 0) {
                scores['Pokemon'][joueur.id] = 0;
                message.channel.send(joueur.username + " n'a pas marqué de point lors de ce tour (10 minutes écoulées).\r\nLe mot à trouver était : " + Mot[0]);
            }
            else {
                scores['Pokemon'][joueur.id] -= 1;
                message.channel.send(joueur.username + " vient de retomber à " + scores['Motus'][joueur.id] + " point(s) (-1 point).\r\nLe mot à trouver était : " + Mot[0]);
            }
            fs.writeFileSync('Scores.json', JSON.stringify(scores));
            segment = 0;
            Multi = 0;
        }, 600000)
    }
})


// Partie "Réponse de l'utilisateur"
bot.on('message', function (message) {
    //Blocage
    if (message.author.bot) return;
    if (segment == 0) return;
    if (!message.content.toLowerCase().startsWith(">")) return;
    if (message.author != joueur && Multi == 0) return;
    if (message.channel.id !== salonCommande) return;

    //Récupère le mot et "l'épelle"
    var proposition = message.content.toUpperCase().slice(1);
    var coupeProposition = proposition.split('');
    /*var testMalPlacees = coupe.slice(0, coupe.length);
    var malPlacees = [];*/

    //Test de la longueur du mot
    if (proposition.length != Mot[0].length) //invalide
    {
        message.channel.send("Le mot que vous proposez ne fait pas la bonne taille. Il faut qu'il soit de " + Mot[0].length + " lettres.");
        return;
    }
    else //valide
    {
        /*console.table(coupe);
        console.table(coupeProposition);
        console.table(testMalPlacees);*/

        var correction = [];
        for (i = 0; i < Mot[0].length; i++) {
            if (coupe[i] == coupeProposition[i]) //Lettre correcte
            {
                correction.push(coupe[i]);
                //testMalPlacees.splice(i, 1, '!');
            }
            else //Lettre incorrecte
            {
                /*if(testMalPlacees.includes(coupeProposition[i]))
                    {
                        testMalPlacees.splice(testMalPlacees.indexOf(coupeProposition), 1, '!');
                        malPlacees.push();
                        console.log(malPlacees);
                    }*/
                correction.push(" ");
            }

        }

        //Partie graphique
        var morceau = [];
        var morceauBloc;
        for (i = 1; i < Mot[0].length; i++) {
            morceau.push("║");
            morceau.push(correction[i]);
        }
        morceauBloc = morceau.join('');
        message.channel.send("Grille de " + joueur.username + " :\r\n```╔" + "═╦".repeat(Mot[0].length - 1) + "═╗\r\n║" + coupe[0] + morceauBloc + "║\r\n╚" + "═╩".repeat(Mot[0].length - 1) + "═╝```");
        /*message.channel.send("Lettre(s) mal placée(s) : " + malPlacees);*/


        //Donne un point en cas de bonne réponse
        if (correction.join('') == Mot[0]) {
            if (Multi == 1) {
                joueur = message.author;
            }
            message.channel.send("Bravo, vous avez trouvé le mot " + Mot[0]);
            Mots = [];
            fichier = fs.readFileSync('Scores.json');
            scores = JSON.parse(fichier);
            if (typeJeu == 1) {
                clearTimeout(TimerChronoMotus)
                if (!Object.keys(scores['Motus']).includes(joueur.id)) {
                    scores['Motus'][joueur.id] = 1;
                    message.channel.send(joueur.username + " a maintenant " + scores['Motus'][joueur.id] + " point(s) (+1 point).");
                }
                else {
                    scores['Motus'][joueur.id] += 1;
                    message.channel.send(joueur.username + " a maintenant " + scores['Motus'][joueur.id] + " point(s) (+1 point).");
                }
            }
            if (typeJeu == 2) {
                clearTimeout(TimerChronoPokemon)
                if (!Object.keys(scores['Pokemon']).includes(joueur.id)) {
                    scores['Pokemon'][joueur.id] = 1;
                    message.channel.send(joueur.username + " a maintenant " + scores['Pokemon'][joueur.id] + " point(s) (+1 point).");
                }
                else {
                    scores['Pokemon'][joueur.id] += 1;
                    message.channel.send(joueur.username + " a maintenant " + scores['Pokemon'][joueur.id] + " point(s) (+1 point).");
                }
            }
            fs.writeFileSync('Scores.json', JSON.stringify(scores));
            segment = 0;
            Multi = 0;
        }
    }
})

//Partie "Abandon"
//"Abandon du joueur"
bot.on('message', function (message) {
    //Blocage
    if (message.content.toLowerCase() != "//abandon") return;
    if (message.author.bot) return;
    if (message.channel.id !== salonCommande) return;

    if (segment == 1) //Le joueur a abandonné
    {
        message.channel.send("Vous avez abandonné le mot.\r\nLe mot à trouver était : " + Mot[0]);
        if (typeJeu == 1) {
            clearTimeout(TimerChronoMotus);
            if (scores['Motus'][joueur.id] <= 2) {
                scores['Motus'][joueur.id] = 0;
                message.channel.send(joueur + " vient de retomber à 0 point.");
            }
            else {
                scores['Motus'][joueur.id] -= 3;
                message.channel.send(joueur + " vient de retomber à " + scores['Motus'][joueur.id] + " point(s) (-3 points).");
            }
        }
        if (typeJeu == 2) {
            clearTimeout(TimerChronoPokemon);
            if (scores['Pokemon'][joueur.id] <= 2) {
                scores['Pokemon'][joueur.id] = 0;
                message.channel.send(joueur + " vient de retomber à 0 point.");
            }
            else {
                scores['Pokemon'][joueur.id] -= 3;
                message.channel.send(joueur + " vient de retomber à " + scores['Pokemon'][joueur.id] + " point(s) (-3 points).");
            }
        }
        fs.writeFileSync('Scores.json', JSON.stringify(scores));
        segment = 0;
        Multi = 0;
        Mots = [];
    }
})

//"Forcer l'abandon"
bot.on('message', function (message) {
    //Blocage
    if (message.content.toLowerCase() != "//fabandon") return;
    if (message.author.id != "306020612747427841" && !message.member.roles.find(r => r.id == "689907602095734828") && !message.member.roles.find(r => r.id == "659815280381526017") && !message.member.roles.find(r => r.id == "659793870590312494") && !message.member.roles.find(r => r.id == "681934138521026609")) {
        message.channel.send("Vous n'avez pas la permission d'exécuter cette commande.");
        return;
    }
    if (message.channel.id != salonCommande) return;

    if (segment == 1) //La partie a été terminée de force
    {
        message.channel.send(message.author.username + " vous a fait abandonner le mot.\r\nLe mot à trouver était : " + Mot[0]);
        bot.users.get('306020612747427841').send(message.author + " vient d'utiliser la commande //fabandon sur " + joueur);
        segment = 0;
        if (typeJeu == 1) {
            clearTimeout(TimerChronoMotus);
        }
        if (typeJeu == 2) {
            clearTimeout(TimerChronoPokemon);
        }
        Mots = [];
        Multi = 0;
    }
})

//Partie "Scores"
//"Regarder ses points"
bot.on('message', function (message) {
    //Blocage
    if (message.content.toLowerCase() != "//score") return;
    if (message.channel.id !== salonCommande) return;

    //Lecture des données JSON
    fichier = fs.readFileSync('Scores.json');
    scores = JSON.parse(fichier);

    //Vérification de l'existence de l'utilisateur en Motus
    if (!Object.keys(scores['Motus']).includes(message.author.id)) {
        message.channel.send("Vous n'avez pas encore marqué de point en Motus");
    }
    //S'il existe, on donne son score
    else {
        message.channel.send(message.author.username + ", vous avez actuellement " + scores['Motus'][message.author.id] + " point(s) en Motus.");
    }

    //Vérification de l'existence de l'utilisateur en Motus
    if (!Object.keys(scores['Pokemon']).includes(message.author.id)) {
        message.channel.send("Vous n'avez pas encore marqué de point en Pokémon");

    }
    //S'il existe, on donne son score
    else {
        message.channel.send(message.author.username + ", vous avez actuellement " + scores['Pokemon'][message.author.id] + " point(s) en Pokémon.");
    }
})

//"Regarder les points de tous le monde"
bot.on('message', function (message) {
    //Blocage
    if (!message.content.toLowerCase().startsWith("//score all")) return;
    if (message.channel.id !== salonCommande) return;
    if (TimerScoreMotus == 1 && TimerScorePokemon == 1) {
        message.channel.send("Attendez quelques temps avant de réafficher les scores de tous le monde.");
        return;
    }

    //Lecture des données JSON
    fichier = fs.readFileSync('Scores.json');
    scores = JSON.parse(fichier);

    //Triage des valeurs
    function sortByScore1(a, b) {
        return scores['Motus'][b] - scores['Motus'][a];
    }
    function sortByScore2(a, b) {
        return scores['Pokemon'][b] - scores['Pokemon'][a];
    }

    //Points Pokemon
    if (message.content.toLowerCase().slice(12).startsWith("pokemon") || message.content.toLowerCase().slice(12).startsWith("pkm")) {
        //Limite d'envoi
        if (TimerScorePokemon == 1) {
            message.channel.send("Attendez quelques temps avant de réafficher les scores Pokemon.");
            return;
        }

        //Trie les scores de tous le monde dans Pokemon
        TimerScorePokemon = 1;
        var scoresRangesPokemon = Object.keys(scores['Pokemon']).sort(sortByScore2);
        var messageConcat = "__Scores Pokémon__ :\r\n";
        for (i = 0; i < scoresRangesPokemon.length; i++) {
            if (i == 0) {
                messageConcat = messageConcat.concat('\r\n', ("**__Podium__**"));
            }
            if (i == 3) {
                messageConcat = messageConcat.concat('', "\r\n\r\n");
                messageConcat = messageConcat.concat('', "**__Top 4~10__**");
            }
            if (i == 10) {
                messageConcat = messageConcat.concat('', "\r\n\r\n");
                messageConcat = messageConcat.concat('', "**__Top 11~25__**");
            }
            if (i == 25) {
                messageConcat = messageConcat.concat('', "\r\n\r\n");
                messageConcat = messageConcat.concat('', "**__Top 25~50__**");
            }
            messageConcat = messageConcat.concat('\r\n', ("**" + bot.users.get(scoresRangesPokemon[i]).username + "** a un score de " + scores['Pokemon'][scoresRangesPokemon[i]] + "."));
        }
        //Envoie les scores triés
        message.channel.send(messageConcat);
        //Cooldown : 3 minutes (180000 ms)
        setTimeout(() => {
            TimerScorePokemon = 0;
        }, 180000)
    }

    if (message.content.toLowerCase().slice(12).startsWith("motus")) {
        //Limite d'envoi
        if (TimerScoreMotus == 1) {
            message.channel.send("Attendez quelques temps avant de réafficher les scores Motus.");
            return;
        }

        //Trie les scores de tous le monde dans Motus
        TimerScoreMotus = 1;
        var scoresRangesMotus = Object.keys(scores['Motus']).sort(sortByScore1);
        var messageConcat = "__Scores Motus__ :\r\n";
        for (i = 0; i < scoresRangesMotus.length; i++) {
            if (i == 0) {
                messageConcat = messageConcat.concat('\r\n', ("**__Podium__**"));
            }
            if (i == 3) {
                messageConcat = messageConcat.concat('', "\r\n\r\n");
                messageConcat = messageConcat.concat('', "**__Top 4~10__**");
            }
            if (i == 10) {
                messageConcat = messageConcat.concat('', "\r\n\r\n");
                messageConcat = messageConcat.concat('', "**__Top 11~25__**");
            }
            if (i == 25) {
                messageConcat = messageConcat.concat('', "\r\n\r\n");
                messageConcat = messageConcat.concat('', "**__Top 25~50__**");
            }
            messageConcat = messageConcat.concat('\r\n', ("**" + bot.users.get(scoresRangesMotus[i]).username + "** a un score de " + scores['Motus'][scoresRangesMotus[i]] + "."));
        }
        //Envoie les scores triés
        message.channel.send(messageConcat);
        //Cooldown : 3 minutes (180000 ms)
        setTimeout(() => {
            TimerScoreMotus = 0;
        }, 180000)
    }
})

//Partie "Suggestion"
bot.on('message', function (message) {
    if (message.author.bot || message.channel.id != salonCommande || !message.content.toLowerCase().startsWith('//suggestion')) return;

    bot.users.get('306020612747427841').send(message.author.username + " vous a proposé : " + message.content.slice(13));
})

