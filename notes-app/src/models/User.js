import bcrypt from "bcryptjs";
import {MONGODB_URI} from "../config.js"
import { MongoClient } from 'mongodb';

// Establece la conexión a MongoDB (completa esta parte)
const client = new MongoClient(MONGODB_URI);
const db = client.db('notesdb');
const users = db.collection('users');

// Métodos para la contraseña
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

export { users, encryptPassword, matchPassword };


/**
 * 
 * 
 * import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

// Establece la conexión a MongoDB (completa esta parte)
const client = new MongoClient(MONGODB_URI);
const db = client.db(notesdb);
const users = db.collection('users');

// Métodos para la contraseña
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

export { users, encryptPassword, matchPassword };

 */