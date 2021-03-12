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
          content: `${server.roleId}`,
          embed: {
            color: regular,
            title: ``,
            description: `**Watchlist ${
              date.getMonth() + 1
            }/${date.getDate()}**\n${message.content.substring(
              4,
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
