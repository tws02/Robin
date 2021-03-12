const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server.js");

module.exports = {
  name: "unsub",
  async execute(client, message, args) {
    try {
      const exists = await Server.findOne({ id: message.guild.id });
      if (exists) {
        await exists.remove();
        message.channel.send({
          embed: {
            color: regular,
            title: `Server ID ${message.guild.id} is now unsubscribed from signals.`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      } else {
        message.channel.send(
          message.channel.send({
            embed: {
              color: regular,
              title: `Server ID ${message.guild.id} is not subscribed to signals.`,
              timestamp: new Date(),
              footer: {
                text: footer,
                icon_url: photoURL
              }
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
};
