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
          server.channelId.substring(2, server.channelId.length - 1)
        );

        tChannel.send({
          content: `${server.roleId}`,
          embed: {
            color: red,
            title: `STC $${args[0] ? args[0].toUpperCase() : "-"}`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
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
      });
    } catch (error) {
      console.log(error);
    }
  }
};
