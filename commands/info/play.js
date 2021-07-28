const Discord = require('discord.js')


const distube = require('distube')
module.exports = {
    name: "play",
    description: "play music",
    run: async(client, message, args) => {
      
      
          if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
              if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("join my voice channel")
    
    const music = args.join(" ");

client.distube.play(message, args.join(' '))}



    }
