// BOT CONFIGURATION
// Contain Token
const fs = require('fs');

const {Client, Intents, MessageAttachment} = require("discord.js");
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

bot.login("NjAxODM2NzYyMDA4MTI1NDYw.XTIGKQ.5be0KI4tcQI6o4HtUgRojT1MZrI");

const { promisify } = require("util");
const wait = promisify(setTimeout);

const idTokami = "659767673898663948"; //ID du serveur
const salonsAnnonces = ["923893129680154625","923893151385661460","624474248311734274"]; //Salons d'annonce
const blacklistBots = ["282286160494067712","601836762008125460"] //Bots dont le message n'est pas supprimé par l'Assist-o-bot

const invitTkm = "5CsmwzyKT7"; //Invitation Tokami
const separTkm = "921891177207320586";
const roleTkm = "921891191031738378";

const invitPwx = "G5Czm7CfNa"; //Invitation Piwex
const separPwx = "921891181649084497";
const rolePwx = "922059977705816075";
const actuPwx = "921891185776296017";
const commuPwx = "922059976711757844";

const invitTsn = "S8tEvbHeya"; //Invitation TsunoKawaii
const separTsn = "921891183565864970";
const roleTsn = "922061022431436810";

const invitNyl = "DuSuSKqgpU"; //Invitation Neyyl
const separNyl = "922059982705426452";
const roleNyl = "922062589637328897";
const actuNyl = "922062592682377229";
const commuNyl = "922062592225210370";

const invitGdr = "TeZwF834HG"; //Invitation GeekDraw
const separGdr = "922061016433577984";
const roleGdr = "922063588275916880";
const actuGdr = "922063589886545941";
const commuGdr = "922063593191657492";
const partGdr = "922063590922534962";
const achGdr = "922063591652343808";

const invitSbo = "UdHQwq83RK"; //Invitation Sibyo
const separSbo = "922061026944491611";
const roleSbo = "922067218299224124";

//Carte des liaisons entre les invitations et les rôles à donner
const rolesMember = new Map([
	[invitTkm, [roleTkm,separTkm]],
	[invitPwx, [rolePwx,separPwx,actuPwx,commuPwx]],
	[invitTsn, [roleTsn,separTsn]],
	[invitNyl, [roleNyl,separNyl,actuNyl,commuNyl]],
	[invitGdr, [roleGdr,separGdr,actuGdr,commuGdr,partGdr,achGdr]],
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

bot.on("error", (error) => {
	bot.guild.channels.cache.get("686253217343864881").send("<@306020612747427841> Je viens de rencontrer une erreur !\r\n\r\nErreur :\r\n" + error);
})

bot.on("guildMemberAdd", async (member) => {
	if (member.guild.id !== idTokami) {
	return;
}

member.guild.invites.fetch().then((gInvite) => {
	let invite = undefined;
	let inviteur = undefined;
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
	if(typeof invite.code !== "undefined"){
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
	} else {
		member.guild.channels.cache.get("686253217343864881").send("<@306020612747427841>, invite.code a planté :D")
	}
  })
})
