const mongoose = require("mongoose");
const { dbHost, dbName, dbPass, dbPort, dbUser } = require("../app/config");

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPass}@foodstore.4tgn1tv.mongodb.net/${dbName}?retryWrites=true&w=majority`
);

const db = mongoose.connection;

module.exports = db;
