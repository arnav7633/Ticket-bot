const db = require('quick.db')
module.exports = {
    description: 'Set the stock',
    category: 'Stocks',
    requiredPermissions: ['ADMINISTRATOR'],
    callback: async (message, args, argsString) => {
        await db.set(`coins-stock`, args[0])
        message.reply('The coins stock has been set!')
    }
}