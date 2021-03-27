const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server.js");

module.exports = {
  name: "unsub",
  async execute(client, message, args) {
    try {
      const exists = await Server.findOne({ serverId: message.guild.id });
      if (!exists) {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is not subscribed to options signals.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else if (exists.optionsId && exists.optionsId != "undefined") {
        exists.optionsId = "undefined";
        exists.optionsRoleId = "undefined";

        await exists.save();

        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is now unsubscribed from options signals.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is already subscribed to stock signals.`,
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
