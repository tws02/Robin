const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema({
  id: {
    type: String
  },

  channelId: {
    type: String
  },

  wlId: {
    type: String
  },

  roleId: {
    type: String
  },

  lastMsgId: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Server = mongoose.model("server", ServerSchema);
