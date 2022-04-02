const LGRox = require('./LGRox.js');

//Permet de choisir le salon de saisie des commandes
function Salon(message) {
    {
        if (message.channel.id != LGRox.Config['salonCommande']) {
            LGRox.Config['salonCommande'] = message.channel.id;
            message.channel.send("Le salon de jeu vient d'être défini !");
            LGRox.fs.writeFileSync('./JSON/Config.json', JSON.stringify(LGRox.Config));
        } else {
            message.channel.send('Ce salon est déjà celui des commandes de L\'Assist-o-bot :D')
        }
    }
}

//Permet de vérifier si la commande est faite dans le bon salon 
function Detection(message) {
    if (message.content != LGRox.Config['prefix']+'salon') {
        if (message.channel.id != LGRox.Config['salonCommande']) return true; //Mauvais Salon ?
    }
    if (message.author.bot) return true; //Bot ?
    else return false // Bon salon et Humain
}

function Clear() {
    //Etat & Nombre de joueurs
    LGRox.Config['state'] = 0; //Etat initial
    LGRox.Composition['nbJoueursPartie'] = 0; //Nombre de joueur nul

    //Listes de joueurs et rôles
    LGRox.Composition["players"] = []; //Vide la liste des joueurs
    LGRox.Composition["listeRole"] = []; //Vide la liste des rôles
    LGRox.Composition["group"] = []; //Vide la liste des groupes (LG,Couple,etc)

    LGRox.fs.writeFileSync("./JSON/Composition.json", JSON.stringify(LGRox.Composition));
    LGRox.fs.writeFileSync("./JSON/Config.json", JSON.stringify(LGRox.Config));
}

exports.Salon = Salon;
exports.Clear = Clear;
exports.Detection = Detection;
