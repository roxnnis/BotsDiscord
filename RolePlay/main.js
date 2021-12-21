// BOT CONFIGURATION
// Contient le Jeton d'activation du Bot Discord.
const fs = require('fs');
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

//Requires
const Classes = require('./classes.js');

//#region Création de personnages
//Variables d'armes (pour aller plus vite)
Poulet = Classes.Shop.Armes['Revolver composite'];
KFC = Classes.Shop.Armes['Epée longue']

//Persos
Roxnnis = new Classes.Personnage({Nom:"Roxnnis",Weapons:{Principale:KFC,Auxiliaire:new Classes.Armes()}, Stats:new Classes.Stats({phy:10,int:12,soc:22,cha:2}),LVL:7});
Dexhort = new Classes.Personnage({Nom:"MJ",Weapons:{Principale:Poulet,Auxiliaire:Poulet}, Stats:new Classes.Stats({phy:69,men:69,int:69,soc:69,cha:69}),LVL:96});

//JSON lecture
const Pers = fs.readFileSync('./Personnages.json');
var rolistes = JSON.parse(Pers);

rolistes["Roxnnis"] = {Nom:Roxnnis.Nom,LVL:Roxnnis.LVL,Money:Roxnnis.Money,Weight:Roxnnis.Weight.Total,PV:Roxnnis.PV,Stats:Roxnnis.Stats,Weapons:Roxnnis.Weapons}
rolistes["Dexhort"] = {Nom:Dexhort.Nom,LVL:Dexhort.LVL,Money:Dexhort.Money,Weight:Dexhort.Weight.Total,PV:Dexhort.PV,Stats:Dexhort.Stats,Weapons:Dexhort.Weapons}

//Écriture dans JSON
fs.writeFileSync('Personnages.json', JSON.stringify(rolistes));

//#endregion
//#region Déclaration du bot
const {Client, Intents, Collection, MessageEmbed} = require("discord.js");
const bot = new Client({
	intents: [
	  Intents.FLAGS.GUILDS,
	  Intents.FLAGS.GUILD_MESSAGES,
	  Intents.FLAGS.GUILD_MEMBERS,
	  Intents.FLAGS.GUILD_PRESENCES,
	  Intents.FLAGS.DIRECT_MESSAGES
	],
  });

  //Intégrer les commandes
  bot.commands = new Collection();
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	bot.commands.set(command.data.name, command);
}

  //Connexion du Bot
  bot.login(SettBot.Token);
//#endregion


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() || interaction.channelId != "624474305018855449") return;

	const { commandName } = interaction;
	const command = bot.commands.get(commandName)

	if(!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})