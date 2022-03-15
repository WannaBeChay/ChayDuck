// Os requesitos dos packages
const {  Client,  Intents} = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');
const colors = require('colors');
const util = require('minecraft-server-util');
const randomPuppy = require('random-puppy');
const moment = require('moment');
const jimp = require("jimp");


// Variaveis
const client = new Client({  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.DIRECT_MESSAGES] });
const config = require('./config.json');
const gifs_db = require("./gifs_db.json");
const xpfile = require("./xp.json");
const bank = require("./bank.json");

// Variaveis
client.config = config;
client.commands = new Enmap();
client.gifs_db = gifs_db;
client.xpfile = xpfile;
client.bank = bank;

//Faz a leitura da pasta events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

// Pega o nome do ficheiro para se executar
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`█ A Carregar o comando: ${commandName}`.bold.brightWhite);
    client.commands.set(commandName, props);
  });
});

// Sistema XP
client.on('message', function (message) {

  if (message.author.bot) return;
  var addXP = Math.floor(Math.random() * 5) + 2;
  if (!xpfile[message.author.id]) {
    xpfile[message.author.id] = {
      xp: 0,
      level: 0,
      reqxp: 50
    }

    fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
      if (err) console.log(err)
    })
  } else {
    xpfile[message.author.id].xp += addXP
    console.log(xpfile[message.author.id].xp)
    console.log(addXP)
    if (xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
      //xpfile[message.author.id].xp -= 
      xpfile[message.author.id].reqxp *= 3.5 //xp que é preciso aumentar
      xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp) //reqxp volta
      xpfile[message.author.id].level += 1 // Adicionar level
      xpfile[message.author.id].reqxp // retirar xp

      message.reply("Now you are on Level ** " + xpfile[message.author.id].level + "** !")//.then(message => message.delete({timeout: "1000000"}))
    }

    fs.writeFile("./xp.json", JSON.stringify(xpfile), function (err) {
      if (err) console.log(err)
    })
  }
});
// Sistema Coins
client.on('message', function (message) {

  if(message.author.bot) return;
  var addCoins = Math.floor(Math.random() * 3) + 2;
  if(!bank[message.author.id]){
      bank[message.author.id] = {
        coins: 100
    }
  
  } else {
    bank[message.author.id].coins += addCoins
    console.log(bank[message.author.id].coins)
    console.log(addCoins)

    fs.writeFile("./bank.json", JSON.stringify(bank), function (err) {
      if (err) console.log(err)
    })
}
});

client.on('ready', async () => {
  console.log(`██ ${client.user.username} pronto para funcionar!`.underline.brightBlue);
  //client.user.setStatus("online"); // dnd, idle, online, invisible
});

client.login(config.token);