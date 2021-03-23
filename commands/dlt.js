const { green, red, regular, photoURL, footer } = require("../config.json");

module.exports = {
  name: "dlt",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        const tChannel = client.channels.cache.get(
          server.stocksId.substring(2, server.stocksId.length - 1)
        );
        tChannel.lastMessage.delete();
      });

      message.channel.send({
        embed: {
          color: regular,
          title: ``,
          description: "Last message deleted on subscribed stock channels",
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
