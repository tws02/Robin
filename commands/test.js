const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server");

const testMsg = {
  color: regular,
  title: "Test Message",
  description: "",
  footer: {
    text: footer,
    icon_url: photoURL
  }
};

module.exports = {
  name: "test",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        // fetch channelid
        // send message
        const tChannel = client.channels.cache.get(
          server.channelId.substring(2, server.channelId.length - 1)
        );
        tChannel.send({
          content: `${server.roleId}`,
          embed: testMsg
        });
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
