const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server");

module.exports = {
  name: "say",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        const tChannel = client.channels.cache.get(
          server.stocksId.substring(2, server.stocksId.length - 1)
        );

        tChannel.send({
          content: `${server.stocksRoleId}`,
          embed: {
            color: regular,
            title: ``,
            description: `${message.content.substring(
              5,
              message.content.length
            )}`,
            image: {
              url: `${
                message.attachments.last() ? message.attachments.last().url : ""
              }`
            },
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            }
          }
        });

        server.stocksMsgId = tChannel.lastMessageID;
        await server.save();
      });
    } catch (error) {
      console.log(error);
    }
  }
};
