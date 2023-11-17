import bcrypt from "bcryptjs";
import {MONGODB_URI} from "../config.js"
import { MongoClient } from 'mongodb';

// Centraliza la conexión a MongoDB
const client = new MongoClient(MONGODB_URI);
let db, users;

async function connectDB() {
  await client.connect();
  db = client.db(); // Si tienes un nombre específico para la DB, úsalo aquí.
  users = db.collection('users');
}

connectDB().catch(console.error);

// Métodos para la contraseña
const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    // Manejar el error, por ejemplo, lanzar una excepción o registrar el error
    console.error("Error al encriptar la contraseña:", error);
    throw error;
  }
};

const matchPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

export { users, encryptPassword, matchPassword };

