module.exports = {
    description: 'Add someone to the ticket',
    category: 'Tickets',
    callback: async (message, args) => {
        const chan = message.channel
        const user = message.guild.members.cache.get(`${args[0]}`)
        chan.updateOverwrite(user, {'VIEW_CHANNEL': true, 'SEND_MESSAGES': true, 'MENTION_EVERYONE': false})
        message.reply(`Successfully added ${user}`)
    }
}