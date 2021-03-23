const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server");

module.exports = {
  name: "bto",
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
            color: green,
            title: `BTO $${args[0] ? args[0].toUpperCase() : "-"} ${
              args[1] ? "(" + args[1] + ")" : ""
            }`,
            description: ``,
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
                name: "Entry",
                value: `$${args[2] ? parseFloat(args[2]).toFixed(2) : "-"}`,
                inline: true
              },
              {
                name: "Stop Loss",
                value: `$${args[3] ? parseFloat(args[3]).toFixed(2) : "-"}`,
                inline: true
              },
              {
                name: "Take Profit 1",
                value: `$${args[4] ? parseFloat(args[4]).toFixed(2) : "-"}`
              },
              {
                name: "Take Profit 2",
                value: `$${args[5] ? parseFloat(args[5]).toFixed(2) : "-"}`
              },
              {
                name: "Risk",
                value: `${args[6] ? args[6] : "-"}`
              },
              {
                name: "Note",
                value: `${
                  args.length > 7 ? args.slice(7, args.length).join(" ") : "-"
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
