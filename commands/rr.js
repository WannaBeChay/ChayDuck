exports.run = (client, message, args) => {
    if(!args || args.length < 1) return message.reply("You have to specify the command you want to restart!");
    const commandName = args[0];
    // Verifica se o comando existe e se esta válido
    if(!client.commands.has(commandName)) {
      return message.reply("This command does not exist!");
    }
    // o caminho é relativo ao *current folder*, então pega do nome ./filename.js     
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // Também precisamos excluir e recarregar o comando do client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`Comand **${commandName}** was successfully restarted.`);
    console.log(`████████[Reload],executado por ${message.author.tag}.`.red)
};