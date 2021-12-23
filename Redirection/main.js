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
const roleTkm = "921891191031738378";
const invitPwx = "G5Czm7CfNa"; //Invitation Piwex
const rolePwx = "922059977705816075";
const invitTsn = "qjvAz5mVEC"; //Invitation TsunoKawaii
const roleTsn = "922061022431436810";
const invitNyl = "DuSuSKqgpU"; //Invitation Neyyl
const roleNyl = "922062589637328897";
const invitGdr = "TeZwF834HG"; //Invitation GeekDraw
const roleGdr = "922063588275916880";
const invitSbo = "UdHQwq83RK"; //Invitation Sibyo
const roleSbo = "922067218299224124";

//Carte des liaisons entre les invitations et les rôles à donner
const rolesMember = new Map([
	[invitTkm, roleTkm],
	[invitPwx, rolePwx],
	[invitTsn, roleTsn],
	[invitNyl, roleNyl],
	[invitGdr, roleGdr],
	[invitSbo, roleSbo]
]);

let invitations;

bot.on("ready", async () => {
  await wait(2000);
  bot.guilds.cache
    .get(idTokami)
    .invites.fetch()
    .then((inv) => {
      invitations = {};
      inv.forEach((v, k, m) => (invitations[k] = v.uses));
    });
});

bot.on("guildMemberAdd", async (member) => {
	if (member.guild.id !== idTokami) {
	return;
}

member.guild.invites.fetch().then((gInvite) => {
	let invite = undefined;
	gInvite.forEach((v, k, m) => {
		if (invitations[k] === undefined) {
			invitations[k] = 0;
		}
		if (invitations[k] < v.uses) {
		invite = v;
	}
    })
    //MAJ nombres d'invitations
    invitations[invite.code] += 1;

    //Ajout du rôle
	if(rolesMember.has(invite.code))
	{
	member.roles.add(rolesMember.get(invite.code));
	} else {
		member.guild.channels.cache.get("908996619935055911").send(`Le lien d'invitation utilisé par ${member.username} est inconnu (Créé après la mise en fonction du bot).`);
	}
  })
})
