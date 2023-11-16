import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI } from "../config.js";

// Establece la conexión a MongoDB
const client = new MongoClient(MONGODB_URI);
await client.connect();
const db = client.db('notesdb'); // Asegúrate de proporcionar el nombre de tu base de datos si es necesario
const notes = db.collection('notes');

// Convertir id de string a ObjectId para búsquedas por _id
const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId");
  }
  return new ObjectId(id);
};

export { notes, toObjectId };
