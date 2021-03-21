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
  name: "ostc",
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
            color: red,
            title: `STC $${args[0] ? args[0].toUpperCase() : "-"} ${
              args[1] ? args[1] : "-"
            } ${args[2] ? args[2] : "-"}`,
            timestamp: new Date(),
            footer: {
              text: footer,
              icon_url: photoURL
            },
            fields: [
              {
                name: "Exit Price",
                value: `$${args[3] ? parseFloat(args[3]).toFixed(2) : "-"}`,
                inline: true
              },
              {
                name: "Size",
                value: `${args[4] ? args[4] : "-"}%`,
                inline: true
              },
              {
                name: "Note",
                value: `${
                  args.length > 5 ? args.slice(5, args.length).join(" ") : "-"
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
