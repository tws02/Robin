const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server.js");

module.exports = {
  name: "wlsub",
  async execute(client, message, args) {
    try {
      const exists = await Server.findOne({ id: message.guild.id });
      if (!exists) {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is not subscribed at all.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else if (exists.wlId && exists.wlId != "undefined") {
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is already subscribed to watchlist.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else {
        const server = await Server.findOneAndUpdate(
          { id: message.guild.id },
          { $set: { wlId: `${args[0]}` } },
          { new: true }
        );

        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is now subscribed to watchlist.`,
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
