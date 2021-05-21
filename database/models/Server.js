const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema({
  serverId: {
    type: String
  },

  stocksId: {
    type: String
  },

  optionsId: {
    type: String
  },

  cryptoId: {
    type: String
  },

  wlId: {
    type: String
  },

  stocksRoleId: {
    type: String
  },

  optionsRoleId: {
    type: String
  },

  cryptoRoleId: {
    type: String
  },

  stocksMsgId: {
    type: String
  },

  optionsMsgId: {
    type: String
  },

  cryptoMsgId: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Server = mongoose.model("server", ServerSchema);
