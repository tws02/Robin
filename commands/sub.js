const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server.js");

module.exports = {
  name: "sub",
  async execute(client, message, args) {
    try {
      const exists = await Server.findOne({ id: message.guild.id });
      if (exists) {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is already subscribed to signals.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
        return;
      }
      const newServer = new Server({
        id: message.guild.id,
        channelId: args[0],
        roleId: args[1],
        lastMsgId: ""
      });

      server = await newServer.save();

      message.channel.send({
        embed: {
          color: regular,
          title: `Server ID ${message.guild.id} is now subscribed to signals.`,
          description: `Channel: ${args[0]}\nRole: ${args[1]}`,
          timestamp: new Date(),
          footer: {
            text: footer,
            icon_url: photoURL
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
