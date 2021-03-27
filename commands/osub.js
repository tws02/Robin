const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server.js");

module.exports = {
  name: "osub",
  async execute(client, message, args) {
    try {
      const exists = await Server.findOne({ serverId: message.guild.id });
      if (!exists) {
        const newServer = new Server({
          serverId: message.guild.id,
          optionsId: args[0],
          optionsRoleId: args[1],
          lastMsgId: ""
        });

        server = await newServer.save();

        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is now subscribed to options signals.`,
            description: `Channel: ${args[0]}\nRole: ${args[1]}`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else if (exists.optionsId && exists.optionsId != "undefined") {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is already subscribed to options signals.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else {
        exists.optionsId = args[0];
        exists.optionsRoleId = args[1];

        await exists.save();

        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is now subscribed to options signals.`,
            description: `Channel: ${args[0]}\nRole: ${args[1]}`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
