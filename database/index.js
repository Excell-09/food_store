const mongoose = require("mongoose");
const { dbHost, dbName, dbPass, dbPort, dbUser } = require("../app/config");

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPass}@foodstore.3kqbupj.mongodb.net/${dbName}?retryWrites=true&w=majority`
);

const db = mongoose.connection;

module.exports = db;
