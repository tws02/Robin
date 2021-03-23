const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server");

module.exports = {
  name: "wl",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        if (server.wlId == "undefined" || server.wlId == null) return;
        const tChannel = client.channels.cache.get(
          server.wlId.substring(2, server.wlId.length - 1)
        );

        const date = new Date();

        tChannel.send({
          content: ``,
          embed: {
            color: regular,
            title: ``,
            description: `**Watchlist ${
              date.getMonth() + 1
            }/${date.getDate()}**\n${message.content.substring(
              4,
              message.content.length
            )}`,
            image: {
              url: `${
                message.attachments ? message.attachments.first().url : ""
              }`
            },
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
