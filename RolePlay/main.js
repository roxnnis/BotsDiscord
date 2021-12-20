// BOT CONFIGURATION
// Contain Token
const fs = require('fs');
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

//Requires
const Classes = require('./classes.js');

//Logs
Gens = new Classes.Personnage({Stats:new Classes.Stats({phy:10,int:12,soc:22,cha:2}),LVL:7});
console.table(Gens.Stats)