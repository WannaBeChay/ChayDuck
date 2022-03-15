const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {
  //let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author)
  const user = message.mentions.users.first() || message.author;

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('**Balance**')
      .setDescription(`**${client.bank[message.author.id].coins} coins**`)
      .setThumbnail(user.displayAvatarURL({size:1024,dynamic:true}))
      .setTimestamp()      
      
    message.channel.send({ embeds: [embed] });
    console.log(`████████[Level],executado por ${message.author.tag}.`.red)
};