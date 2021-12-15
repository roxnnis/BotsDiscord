// BOT CONFIGURATION
// Contain Token
const S = fs.readFileSync("../BotConfig.json");
var SettBot = JSON.parse(S);

const { Client, Intents, InviteGuild, Message } = require("discord.js");
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

const idTokami = "908996618861297674"; //ID du serveur
const invitTkm = "FvCbndNef7"; //Invitation Tokami
const invitPwx = "CbNvspUdc6"; //Invitation Piwex

//Ta
const rolesMember = new Map([
	[invitTkm, "914196106710229042"],
	[invitPwx, "914196805955239956"]
])

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