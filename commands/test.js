const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server");

module.exports = {
  name: "test",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        // fetch channelid
        // send message
        const tChannel = client.channels.cache.get(
          server.stocksId.substring(2, server.stocksId.length - 1)
        );

        tChannel.send({
          content: `${server.stocksRoleId}`,
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
        server.stocksMsgId = tChannel.lastMessageID;
        await server.save();
      });
    } catch (error) {
      console.log(error);
    }
  }
};
