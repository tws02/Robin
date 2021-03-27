const { green, red, regular, photoURL, footer } = require("../config.js");
const Server = require("../database/models/Server");

module.exports = {
  name: "otest",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        // fetch channelid
        // send message
        const tChannel = client.channels.cache.get(
          server.optionsId.substring(2, server.optionsId.length - 1)
        );

        tChannel.send({
          content: `${server.optionsRoleId}`,
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
      });

      server.optionsMsgId = tChannel.lastMessageID;
      await server.save();
    } catch (error) {
      console.log(error);
    }
  }
};
