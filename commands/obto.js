const { green, red, regular, photoURL, footer } = require("../config.json");
const Server = require("../database/models/Server");

module.exports = {
  name: "obto",
  async execute(client, message, args) {
    try {
      const servers = await Server.find();

      servers.forEach(async (server) => {
        const tChannel = client.channels.cache.get(
          server.optionsId.substring(2, server.optionsId.length - 1)
        );

        tChannel.send({
          content: `${server.optionsRoleId}`,
          embed: {
            color: green,
            title: `BTO $${args[0] ? args[0].toUpperCase() : "-"} ${
              args[1] ? args[1] : "-"
            } ${args[2] ? args[2] : "-"}`,
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
                value: `$${args[3] ? parseFloat(args[3]).toFixed(2) : "-"}`,
                inline: true
              },
              {
                name: "SL (Share Value)",
                value: `$${args[4] ? parseFloat(args[4]).toFixed(2) : "-"}`,
                inline: true
              },
              {
                name: "TP (Share Value)",
                value: `$${args[5] ? parseFloat(args[5]).toFixed(2) : "-"}`
              },
              {
                name: "Note",
                value: `${
                  args.length > 6 ? args.slice(6, args.length).join(" ") : "-"
                }`,
                inline: false
              }
            ]
          }
        });
        server.optionsMsgId = tChannel.lastMessageID;
        await server.save();
      });
    } catch (error) {
      console.log(error);
    }
  }
};
