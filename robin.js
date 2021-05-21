const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.js");
const connectDB = require("./database/db.js");
const { wsID, robinID } = require("./config.js");

require("dotenv").config();

console.log(process.env);
connectDB();
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandsCrypto = fs
  .readdirSync("./commandsCrypto")
  .filter((file) => file.endsWith(".js"));

const commandsOption = fs
  .readdirSync("./commandsOption")
  .filter((file) => file.endsWith(".js"));

const commandsStock = fs
  .readdirSync("./commandsStock")
  .filter((file) => file.endsWith(".js"));

for (const file of commandsCrypto) {
  const commandsCrypto = require(`./commandsCrypto/${file}`);
  client.commands.set(commandsCrypto.name, commandsCrypto);
}

for (const file of commandsOption) {
  const commandsOption = require(`./commandsOption/${file}`);
  client.commands.set(commandsOption.name, commandsOption);
}

for (const file of commandsStock) {
  const commandsStock = require(`./commandsStock/${file}`);
  client.commands.set(commandsStock.name, commandsStock);
}

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.login(token);
console.log(client.commands);

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
