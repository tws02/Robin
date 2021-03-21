const { green, red, regular, photoURL, footer } = require("../config.json");
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

/*
retrieve the list of servers
send message to every server stored on db (the channel id)
udpate lastmsg id
*/

// store msg id
/*tChannel.messages.fetch({ limit: 1 }, (messages) => {
        console.log("2");
        const tMsg = messages.first();
        console.log(tMsg.id);
      });*/
/*const tMsg = tChannel.messages.fetch({ limit: 1 }).first();
      console.log(tMsg.id);
      server.lastMsgId = tMsg.id;
      await server.save();
      update last msgid
      how to get last msg id
      console.log(tMsg.id);
      */
