// BOT CONFIGURATION
// Contain Token
const fs = require('fs');
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

const {Client, Intents} = require("discord.js");
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

bot.login(SettBot.Token);

const { promisify } = require("util");
const wait = promisify(setTimeout);

const idTokami = "659767673898663948"; //ID du serveur
const invitTkm = "5CsmwzyKT7"; //Invitation Tokami
const separTkm = "921891177207320586";
const roleTkm = "921891191031738378";

const invitPwx = "G5Czm7CfNa"; //Invitation Piwex
const separPwx = "921891181649084497";
const rolePwx = "922059977705816075";

const invitTsn = "qjvAz5mVEC"; //Invitation TsunoKawaii
const separTsn = "921891183565864970";
const roleTsn = "922061022431436810";

const invitNyl = "DuSuSKqgpU"; //Invitation Neyyl
const separNyl = "922059982705426452";
const roleNyl = "922062589637328897";

const invitGdr = "TeZwF834HG"; //Invitation GeekDraw
const separGdr = "922061016433577984";
const roleGdr = "922063588275916880";

const invitSbo = "UdHQwq83RK"; //Invitation Sibyo
const separSbo = "922061026944491611";
const roleSbo = "922067218299224124";

//Carte des liaisons entre les invitations et les rôles à donner
const rolesMember = new Map([
	[invitTkm, [roleTkm,separTkm]],
	[invitPwx, [rolePwx,separPwx]],
	[invitTsn, [roleTsn,separTsn]],
	[invitNyl, [roleNyl,separNyl]],
	[invitGdr, [roleGdr,separGdr]],
	[invitSbo, [roleSbo,separSbo]]
]);

let invitations;

bot.on("ready", async () => {
  await wait(2000);
  bot.guilds.cache
    .get(idTokami)
    .invites.fetch()
    .then((inv) => {
      invitations = {};
      inv.forEach((v, k, m) => (
		  invitations[k] = v.uses
		  ));
    });
});

bot.on("guildMemberAdd", async (member) => {
	if (member.guild.id !== idTokami) {
	return;
}

member.guild.invites.fetch().then((gInvite) => {
	let invite = undefined;
	let inviteur = undefined
	gInvite.forEach((v, k, m) => {
		if (invitations[k] === undefined) {
			invitations[k] = 0;
		}
		if (invitations[k] < v.uses) {
		invite = v;
		inviteur = v.inviter;
	}
    })
    //MAJ nombres d'invitations
    invitations[invite.code] += 1;

    //Ajout du rôle
	if(rolesMember.has(invite.code))
	{
		for(var key in rolesMember.get(invite.code)){
			member.roles.add(rolesMember.get(invite.code)[key])
		}
	} else {
		member.guild.channels.cache.get("675755347314737211").send(`Le lien d'invitation ${invite} créé par **${inviteur.username}** utilisé par ${member.user} est inconnu (Créé après la mise en fonction du bot).`);
	}
  })
})