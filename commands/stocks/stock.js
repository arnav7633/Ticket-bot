const db = require('quick.db')
module.exports = {
    description: 'get the stock',
    category: 'Stocks',
    callback: async (message, args, argsString) => {
        let stock = await db.get(`coins-stock`)
        message.reply(`There are currently ${stock} coins!`)
    }
}