const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server");

module.exports = {
  name: "cstc",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        const tChannel = client.channels.cache.get(
          server.cryptoId.substring(2, server.cryptoId.length - 1)
        );

        tChannel.send({
          content: `${server.cryptoRoleId}`,
          embed: {
            color: red,
            timestamp: new Date(),
            description: `${message.content.substring(5)}`,
            footer: {
              text: footer,
              icon_url: photoURL
            },
            image: {
              url: `${
                message.attachments.last() ? message.attachments.last().url : ""
              }`
            }
          }
        });

        server.cryptoMsgId = tChannel.lastMessageID;
        await server.save();
      });
    } catch (error) {
      console.log(error);
    }
  }
};
