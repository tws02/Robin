const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.js");
const connectDB = require("./database/db.js");
const { wsID, robinID } = require("./config.js");

connectDB();
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.login(token);

client.on("message", (message) => {
  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    (message.author.id != robinID && message.author.id != wsID)
  )
    return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

module.exports = client;
