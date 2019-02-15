const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', function() {
    console.log('[INFORMATION] robot prêt')
    setInterval(intervalle, 10000, 'inter')
    function intervalle(){
    client.user.setActivity(`r!help |-| ${client.guilds.size} serveurs`)
    }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'gare' || ch.name === 'bienvenue' || ch.name === 'aéroport');
  if (!channel) return;
  var welcome = new Discord.RichEmbed()
  welcome.addField(`:bank: Bienvenue sur **${member.guild.name}** :bank:`, `${member.user} est le **${member.guild.memberCount}**éme membre du serveur !`)
  welcome.setColor("#ffffff")
  channel.send(welcome)
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'gare' || ch.name === 'bienvenue' || ch.name === 'aéroport');
  if (!channel) return;
  var welcome = new Discord.RichEmbed()
  welcome.addField(`:no_pedestrians: ${member.displayName} a quitté **${member.guild.name}** :no_pedestrians:`, `Nous sommes maintenant **${member.guild.memberCount}** membres sur le serveur.`)
  welcome.setColor("#ffffff")
  channel.send(welcome)
});

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

    else if (message.content === 'r!userinfo') {
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()
        .setColor("#ff5c33")
        .setTitle(`Informations sur l'utilisateur : ${message.author.username}`)
        .addField(`:id: ID de l'utilisateur :`, msgauthor, true)
        .addField(`:calendar_spiral: Date de création du compte :`, userCreateDate[1] + ` ` + userCreateDate[2] + ` ` + userCreateDate [3])
        .setThumbnail(message.author.avatarURL)
        message.channel.send({embed: stats_embed})
    }

});

client.login(process.env.TOKEN);
