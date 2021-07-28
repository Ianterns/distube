const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const ms = require('ms')
const fs = require('fs')
const client = new Client({
    disableMentions: "everyone",
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    ws: { intents: Intents.ALL }
});
const DisTube = require('distube')

const config = require('./config.json')
const prefix = config.prefix
const token = config.token

client.config = config;
client.commands = new Collection(); 
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
   client.user.setActivity(`discord.gg/listing`)
   console.log(`${client.user.tag} has logged in`)
})


client.on('message', async message => {

     const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
     if (message.content.match(prefixMention)) {
     return message.channel.send(`what geek`);
  }
     if(message.author.bot || message.channel.type === "dm") return;
     if (!message.content.startsWith(prefix)) return;
     if (!message.guild) return;
     if (!message.member) message.member = await message.guild.fetchMember(message);
     const args = message.content.slice(prefix.length).trim().split(/ +/g);
     const cmd = args.shift().toLowerCase();
     if (cmd.length == 0) return;
     let command = client.commands.get(cmd)
     if (!command) command = client.commands.get(client.aliases.get(cmd));
     if (command) command.run(client, message, args)
   })



   client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: false });

   client.distube
   
   .on("playSong", (message, queue, song) => {
       let playingEmbed = new Discord.MessageEmbed()
       .setColor("#69919D")
       .setTitle(`🎵 Now Playing 🎵`)
       .setDescription(`[**${song.name} - ${song.formattedDuration}**](${song.url})`)
                   .addField("Download:", `[\`Click here\`](${song.streamURL})`, true)
               .addField("Volume:", `${queue.volume}%`, true)
               .addField("Loop", `${queue.repeatMode ? queue.repeatMode === 2 ? ":thumbsup: queue" : ":thumbsup: song" : "off"}`, true)
                           .addField("Filter", `${queue.filter || "none"}`, true)
   
   
          .addField("Duration", `${queue.formattedCurrentTime} - ${song.formattedDuration}`, true)
   
   .setFooter("deafen me for better experience")
       message.channel.send(playingEmbed)
   })
   .on("addSong", (message, queue, song) => {
       let queueEmbed = new Discord.MessageEmbed()
       .setColor("#69919D")
       .setTitle(`Aux - Queue`)
       .setDescription(`[**${song.name} - ${song.formattedDuration}**](${song.url})`)
                   .addField("Download:", `[\`Click here\`](${song.streamURL})`, true)
               .addField("Volume:", `${queue.volume}%`, true)
               .addField("Loop", `${queue.repeatMode ? queue.repeatMode === 2 ? ":thumbsup: queue" : ":thumbsup: song" : "off"}`, true)
   
          .addField("Duration", `${queue.formattedCurrentTime} - ${song.formattedDuration}`, true)
   
   
       message.channel.send(queueEmbed)
   })
   .on("playList", (message, queue, playlist, song) => {
   
       message.channel.send(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\``)
   })
   .on("addList", (message, queue, playlist) => message.channel.send(
       `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`
   ))
   // DisTubeOptions.searchSongs = true
   .on("searchResult", (message, result) => {
       let i = 0;
       message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
   })
   // DisTubeOptions.searchSongs = true
   .on("searchCancel", (message) => message.channel.send(`cancelled`))
   .on("error", (message, e) => {
       console.error(e)
       message.channel.send("An error encountered: " + e);
   });


   client.login(token).catch(() => {
    console.log('Incorrect token given, try again.');
})