const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server.js");

module.exports = {
  name: "unsub",
  async execute(client, message, args) {
    try {
      const exists = await Server.findOne({ serverId: message.guild.id });
      if (!exists || exists.stocksId == "undefined") {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is not subscribed to stock signals.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else if (exists.stocksId && exists.stocksId != "undefined") {
        exists.stocksId = "undefined";
        exists.stocksRoleId = "undefined";

        await exists.save();

        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is now unsubscribed from stocks signals.`,
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
            title: `Server ID ${message.guild.id} is already subscribed to stocks signals.`,
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
