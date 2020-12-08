const Discord = require('discord.js');
const date = require('date-and-time');
const hastebin = require('hastebin');

module.exports = {
    name:"close",
    aliases: ["cl"],
    category: 'Tickets',
    descriptions : 'Close a ticket',
callback: async (message, args, argsString) => {
await db.get(`${message.author.id}-ticketid`, message.channel.id)
await db.get(`${message.author.id}-ticketopenerid`, message.author.id)
  const logchannel = "779013468849700899"
  let reason = args.join(" ");

  if(!reason) reason = 'None Provided'

 


  message.channel.messages.fetch()
  .then(messages => {
    let text = "";

  for (let [key, value] of messages) {
        const now = new Date();
      let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;

      text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
  }

  hastebin.createPaste(text, {
          raw: true,
          contentType: 'text/plain',
          server: 'https://hastebin.com'

      })
      .then(async data => {
          console.log(`Created paste: ${data}`);
          
          const log = message.guild.channels.cache.get('779013468849700899')
          let authorsend = new Discord.MessageEmbed()
          .setColor('#e64b0e')
          .setDescription(`[Message Transcript](${data}) Of Your Ticket In ${message.guild.name}`)

          let closedticket = new Discord.MessageEmbed()
          .setColor('#e64b0e')
          .setDescription(`Ticket Closed & Moved To Closed Tickets. This Ticket Will Be Deleted In 6 seconds\n\n[Ticket Transcript](${data}) Or Run \`ticket.last\` To Get Additional Info`)


    let channeldelete = message.guild.channels.cache.get(message.channel.id)
    let category =message.guild.channels.cache.find(c => c.name == "CLOSED TICKETS" && c.type == "category")
    if(category) channeldelete.setParent(category.id) 
    log.send(closedticket)
    channeldelete.send(closedticket)

        setTimeout(() => {
          channeldelete.delete()
        }, 6000);

      })
})
}     

  }