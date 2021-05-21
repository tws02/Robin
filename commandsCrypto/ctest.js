const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server");

module.exports = {
  name: "ctest",
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
            color: regular,
            title: "Test Message",
            description: "",
            image: {
              url: `${
                message.attachments.last() ? message.attachments.last().url : ""
              }`
            },
            footer: {
              text: footer,
              icon_url: photoURL
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
