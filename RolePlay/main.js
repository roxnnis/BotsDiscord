// BOT CONFIGURATION
// Contain Token
const fs = require('fs');
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

//Requires
const Classes = require('./classes.js');

//Log
Gens = new Classes.Personnage()
Gens.getName();
Gens.getPV();
Gens.getPoids();
Gens.getStats();
