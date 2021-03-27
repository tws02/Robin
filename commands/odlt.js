const { green, red, regular, photoURL, footer } = require("../config.js");

module.exports = {
  name: "odlt",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        const tChannel = client.channels.cache.get(
          server.optionsId.substring(2, server.optionsId.length - 1)
        );
        tChannel.lastMessage.delete();
      });

      message.channel.send({
        embed: {
          color: regular,
          title: ``,
          description: "Last message deleted on subscribed option channels",
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
