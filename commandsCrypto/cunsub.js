const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server.js");

module.exports = {
  name: "cunsub",
  async execute(client, message, args) {
    try {
      const exists = await Server.findOne({ serverId: message.guild.id });
      if (!exists || exists.cryptoId == "undefined") {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is not subscribed to crypto signals.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else if (exists.cryptoId && exists.cryptoId != "undefined") {
        exists.cryptoId = "undefined";
        exists.cryptoRoleId = "undefined";

        await exists.save();

        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is now unsubscribed from crypto signals.`,
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
            title: `Server ID ${message.guild.id} is already subscribed to crypto signals.`,
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
