const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()

    .setColor('RANDOM')
    .setTitle('**Pang 🏓**')
    .setThumbnail('https://i.pinimg.com/originals/e6/10/9e/e6109e32a9ac1a8f2496d7fba78e9c84.gif')
    .addFields(
      { name: '``Ping``', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
      { name: '``API``', value: `${Math.round(client.ws.ping)}ms `, inline: true },)
    .setTimestamp()
    
    message.channel.send({ embeds: [embed] });
    console.log(`████████[Ping],executado por ${message.author.tag}.`.red)
  }