const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server");

const stc = {
  color: regular,
  title: "Test Message",
  description: "testing",
  footer: {
    text: footer,
    icon_url: photoURL
  }
};

module.exports = {
  name: "stc",
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
            color: red,
            title: `STC $${args[0] ? args[0].toUpperCase() : "-"}`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            },
            image: {
              url: `${
                message.attachments.last() ? message.attachments.last().url : ""
              }`
            },
            fields: [
              {
                name: "Exit Price",
                value: `$${args[1] ? parseFloat(args[1]).toFixed(2) : "-"}`,
                inline: true
              },
              {
                name: "Size",
                value: `${args[2] ? args[2] : "-"}%`,
                inline: true
              },
              {
                name: "Note",
                value: `${
                  args.length > 3 ? args.slice(3, args.length).join(" ") : "-"
                }`,
                inline: false
              }
            ]
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
