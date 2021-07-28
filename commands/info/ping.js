const Discord = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ["latency", "pg"],
    description: "bots latency",
    run: async(client, message) => {
        const embed = new Discord.MessageEmbed()
        .setDescription(`${client.ws.ping}ms`)
        .setColor('303135')
        message.channel.send(embed)
    }
}