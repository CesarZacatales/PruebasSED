const mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");
const { MongoClient } = require('mongodb');

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "3000";
const dbname = process.env.DBNAME || "wdyt-uca";

const dburi = 'mongodb://localhost:27017/wdyt-uca';

const connect = async () => {
  debug(dburi);
  try {
    await mongoose.connect(dburi);
    debug("Conexión a la base exitosa");
  } catch (error) {
    debug("Error en la conexión de la base");
    process.exit(1);
  }
}

module.exports = {
  connect
}
