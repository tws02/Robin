const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  prefix: process.env.PREFIX,
  token: process.env.TOKEN,
  green: process.env.GREEN,
  red: process.env.RED,
  regular: process.env.REGULAR,
  robinID: process.env.ROBINID,
  wsID: process.env.WSID,
  photoURL: process.env.PHOTOURL,
  footer: process.env.FOOTER,
  mongoURI: process.env.MAINURI,
  testURI: process.env.TESTURI
};
