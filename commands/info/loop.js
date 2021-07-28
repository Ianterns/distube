const distube = require('distube')


        module.exports = {
            name: "loop",
            description: "loop a song :)",
            run: async(client, message) => {

  if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
              if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send("join my voice channel")

  let mode = null;
  switch (args[0]) {
    case "off":
      mode = 0;
      break;
    case "song":
      mode = 1;
      break;
    case "queue":
      mode = 2;
      break;
  }
  mode = client.distube.setRepeatMode(message, mode);
  mode = mode ? (mode == 2 ? "queue" : "song") : "off";
  message.channel.send(`:thumbsup: - set to ${mode}`);
}
}
