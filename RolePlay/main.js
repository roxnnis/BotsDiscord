// BOT CONFIGURATION
// Contain Token
const fs = require('fs');
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

//Requires
const Classes = require('./classes.js');

//Logs
Poulet = Classes.Shop.Armes['Revolver composite'];
KFC = Classes.Shop.Armes['Epée longue']
Gens = new Classes.Personnage({Weapons:{Arme1:Poulet,Arme2:KFC},Stats:new Classes.Stats({phy:10,int:12,soc:22,cha:2}),LVL:7});
console.log(Gens.Weapons)