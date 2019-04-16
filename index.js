const Discord = require('discord.js');
const client = new Discord.Client();

// _____-----=====[Réaction role]=====-----_____
// Configuration & Settings
const yourID = "234647775621414912"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!createrolemessage"
const initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const embedMessage = `
React to the emoji that matches the role you wish to receive.
If you would like to remove the role, simply remove your reaction!
`;
const embedFooter = "Role Reactions"; // Must set this if "embed" is set to true
const roles = ["Hacker", "Artist", "Public Relations", "Intern"];
const reactions = ["💻", "🖌", "😃", "🆕"];
const embed = true; // Set to "true" if you want all roles to be in a single embed
const embedColor = "#dd2423"; // Set the embed color if the "embed" variable is set to true
const botToken = "";
/**
 * You'll have to set this up yourself! Read more below:
 * 
 * https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
 */

// Import classes and load client
const { Client, RichEmbed } = require('discord.js');
const client = new Client({ disableEveryone: true });
client.login(botToken);

// If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

// Function to generate the role messages, based on your settings
function generateMessages() {
    let messages = [];
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
    return messages;
}

// Function to generate the embed fields, based on your settings and if you set "const embed = true;"
function generateEmbedFields() {
    return roles.map((r, e) => {
        return {
            emoji: reactions[e],
            role: r
        };
    });
}

// Client events to let you know if the bot is online and to handle any Discord.js errors
client.on("ready", () => console.log("Bot is online!"));
client.on('error', console.error);

// Handles the creation of the role reactions. Will either send the role messages separately or in an embed
client.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {

        if (!embed) {
            message.channel.send(initialMessage);

            const toSend = generateMessages();
            toSend.forEach((role, react) => {
                message.channel.send(role).then(m => {
                    m.react(reactions[react]);
                });
            });
        } else {
            const roleEmbed = new RichEmbed()
                .setDescription(embedMessage)
                .setFooter(embedFooter);

            if (embedColor) roleEmbed.setColor(embedColor);

            const fields = generateEmbedFields();
            for (const f of fields) roleEmbed.addField(f.emoji, f.role, true);

            message.channel.send(roleEmbed).then(async m => {
                for (let r of reactions) await m.react(r);
            });
        }
    }
});

// This makes the events used a bit more readable
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == client.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != client.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});
// _____-----=====[Fin de Réaction role]=====-----_____

client.on('ready', function() {
    console.log('[INFORMATION] robot prêt')
    setInterval(intervalle, 10000, 'inter')
    function intervalle(){
    client.user.setActivity(`r!help |-| ${client.guilds.size} serveurs`)
    }
});

// Message de bienvenue
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'gare' || ch.name === 'bienvenue' || ch.name === 'aéroport');
  if (!channel) return;
  var welcome = new Discord.RichEmbed()
  welcome.addField(`:bank: Bienvenue sur **${member.guild.name}** :bank:`, `${member.user} est le **${member.guild.memberCount}**éme membre du serveur !`)
  welcome.setColor("#ffffff")
  channel.send(welcome)
});

// Message d'aurevoire
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'gare' || ch.name === 'bienvenue' || ch.name === 'aéroport');
  if (!channel) return;
  var welcome = new Discord.RichEmbed()
  welcome.addField(`:no_pedestrians: ${member.displayName} a quitté **${member.guild.name}** :no_pedestrians:`, `Nous sommes maintenant **${member.guild.memberCount}** membres sur le serveur.`)
  welcome.setColor("#ffffff")
  channel.send(welcome)
});

//commande r!help
client.on('message', message => {
    if(message.content === 'r!help'){
        var help = new Discord.RichEmbed()
        help.setTitle(":tools: Commandes disponibles :tools: ")
        help.addField(":arrow_forward: r!help", "Afficher toutes les commandes")
        help.addField(":arrow_forward: r!botinfo", "Quelqu'es informations utiles sur le robot")
        help.addField(":arrow_forward: r!userinfo", "Quelqu'es informations sur vous-même")
        help.setColor("#ff5c33")
        help.setFooter(`Demandé par ${message.author.username}`, message.author.displayAvatarURL)
        message.channel.send(help)
    }
    //commande r!botinfo
    else if (message.content === 'r!botinfo') {
      var botinfo = new Discord.RichEmbed()
        .setTitle(":chart_with_upwards_trend: Informations sur le robot :chart_with_downwards_trend:",)
        .addBlankField()
        .addField(":robot: Nom :", client.user.tag)
        .addField(":electric_plug: Etat du robot :", `En développement`)
        .addField(":zap: Connection actuelle du bot :zap: " , `**${message.createdTimestamp - Date.now()}** ms`)
        .addField(":desktop: Autres serveurs sur les quels le robot est connecté" , `**${client.guilds.size}** serveur`)
        .setColor("#ff5c33")
        .setFooter(`Demandé par ${message.author.username}`, message.author.displayAvatarURL)
      message.channel.send(botinfo)
    }
    //commande r!userinfo
    else if (message.content === 'r!userinfo') {
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("#ff5c33")
        .setTitle(`Informations sur l'utilisateur : ${message.author.username}`)
        .addField(`:id: ID de l'utilisateur :`, msgauthor, true)
        .addField(`:calendar_spiral: Date de création du compte :`, userCreateDate[2] + ` ` + userCreateDate[1] + ` ` + userCreateDate [3])
        .setThumbnail(message.author.avatarURL)
        message.channel.send({embed: stats_embed})
    }

});

client.login(process.env.TOKEN);
