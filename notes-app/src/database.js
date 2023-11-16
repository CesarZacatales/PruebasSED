import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./config.js";

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(client.s.options.dbName);
    console.log("Connected to ", db.databaseName);

    // Eventos de conexión y desconexión
    client.on("connected", () => {
      console.log("MongoDB is connected");
    });

    client.on("disconnected", () => {
      console.log("MongoDB is disconnected");
    });

  } catch (error) {
    console.error(error);
  }
};

// Función para acceder a la base de datos desde otros archivos
const getDB = () => {
  if (!db) {
    throw new Error("No database connected!");
  }
  return db;
};

// Exportamos las funciones para conectar y obtener la base de datos
export { connectDB, getDB };
