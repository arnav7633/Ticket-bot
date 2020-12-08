const randomstring = require('randomstring')
const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
    aliases: [],
    category: 'Tickets',
    description: 'Make an ticket',
    callback: async(message) => {
        let rand = randomstring.generate({
            length: 5,
            charset: 'numeric'
          });
          const name = `ticket-${message.author.username}-${rand}`

          const chan =await  message.guild.channels.create(name, {type: 'text'})
          await db.set(`${message.author.id}-ticketid`, chan.id)
          await db.set(`${message.author.id}-tickopenerid`, message.author.id)
          chan.setParent("753116777193537566")
          chan.updateOverwrite(message.guild.roles.everyone, {
            'VIEW_CHANNEL': false
         })
         chan.updateOverwrite(message.guild.roles.cache.find(r => r.name === 'Support'), {
             'VIEW_CHANNEL': true,
             'SEND_MESSAGES': true
         })
         chan.updateOverwrite(message.author.id, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false})
         chan.send(`<@${message.author.id}>`)
          chan.send('What is you IGN?')
        let response = await chan.awaitMessages(m => m.author.id === message.author.id, { max: 1})
          let IGN = response.first();
          chan.send('What are you purchasing? For coins, please type out the amount in millions.')
          let rep2 = await chan.awaitMessages(m => m.author.id === message.author.id, { max: 1})
          let num = rep2.first();
          chan.send('What is your payment status?')
          let pay = await chan.awaitMessages(m => m.author.id === message.author.id, { max: 1})
          let s = pay.first();
          chan.send('What is ur payment method?')
          let r = await chan.awaitMessages(m => m.author.id === message.author.id, { max: 1})
          const w = r.first();
          const gif = "https://cdn.discordapp.com/attachments/778675712067371021/778679090772181072/d74906d39a1964e7d07555e7601b06ad.gif"
         const embed = new Discord.MessageEmbed()
         .setColor('YELLOW')
         .setAuthor('Coins Corp')
         .addFields(
             {
                 name: 'IGN',
                 value: `${IGN}`
             },
             { 
                 name: `Purchasing`,
                 value: `${num}`
             },
             {
                 name: 'Payment Status',
                 value: `${s}`,
                 inline: true
             },
             {
                 name: 'Payment Method',
                 value: `${w}`,
                 inline: true
             }

         )
         .setThumbnail(gif)
         .setFooter(`Bot made by HeadHunter for Coins Corp`)
         chan.send(embed)
         message.delete()
    }
}