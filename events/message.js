module.exports = (client, message) => {
    // Ignora todos os bots
    if (message.author.bot) return;
  
    // Ingona menssagens que não começam com o prefixo (config.jsom)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // A definição padrão de nome de argumento / comando.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Pega o comando data do client.commands Enmap
    const cmd = client.commands.get(command);
  
    // Se o comando não existir, desliga sem fazer nada
    if (!cmd) return;

    // Inicia o comando
    cmd.run(client, message, args);
};