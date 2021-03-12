const { green, red, regular, photoURL, footer } = require("../config.json");

module.exports = {
  name: "dlt",
  execute(message, args) {
    message.channel.send("pong");
  }
};

/*
retrieve list of servers
extract out last message IDs
delete messages by id
update mongoDB
*/

/*
retrieve the list of servers
send message to every server stored on db (the channel id)
udpate lastmsg id
*/
