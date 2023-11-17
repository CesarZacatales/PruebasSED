import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI } from "../config.js";

// Centraliza la conexión a MongoDB
const client = new MongoClient(MONGODB_URI);
let db, notes;

async function connectDB() {
  await client.connect();
  db = client.db(); // Si tienes un nombre específico para la DB, úsalo aquí.
  notes = db.collection('notes');
}

connectDB().catch(console.error);

// Convertir id de string a ObjectId para búsquedas por _id
const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId");
  }
  return new ObjectId(id);
};
export { notes, toObjectId };
