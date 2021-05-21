const { green, red, regular, photoURL, footer } = require("../config.js");

module.exports = {
  name: "cdlt",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        const tChannel = client.channels.cache.get(
          server.cryptoId.substring(2, server.cryptoId.length - 1)
        );
        tChannel.lastMessage.delete();
      });

      message.channel.send({
        embed: {
          color: regular,
          title: ``,
          description: "Last message deleted on subscribed crypto channels",
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
