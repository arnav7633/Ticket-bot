const Discord = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
const client = new Discord.Client()
client.on('ready', () => {
  console.log('READY')
  new WOKCommands(client, 'commands', 'listeners')
 .setDefaultPrefix('!')
 .setCategoryEmoji('Tickets', '📩')
 .setCategoryEmoji('Stocks', '💰')

})

client.login(process.env.TOKEN)