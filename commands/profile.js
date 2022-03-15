const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {
  //let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author)
  const user = message.mentions.users.first() || message.author;

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .addFields(
        {name: `**User**`,
        value: `${user.tag}`}
      )
      .addFields(
        {name: `**User ID**`,
        value: `${user.id}`}
      )
      .addFields(
        {name: '**Joined Discord**',
        value: moment(user.createdAt).format('LLLL')}
      )
      .setImage(user.displayAvatarURL({size:1024,dynamic:true}))
      
    message.channel.send({ embeds: [embed] });
    console.log(`████████[Profile],executado por ${message.author.tag}.`.red)
  };