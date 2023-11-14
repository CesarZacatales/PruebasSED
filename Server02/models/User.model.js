const { client } = require('../config/mongoose'); // Asegúrate de que este sea el camino correcto al archivo que contiene la conexión de MongoDB.
const crypto = require('crypto');
const debug = require('debug')('app:user-model');

// Funciones auxiliares
function makeSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function encryptPassword(password, salt) {
  if (!password) return '';

  try {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  } catch (error) {
    debug({ error });
    return '';
  }
}

// Modelo de usuario para MongoDB
const User = {
  async findOne(filter) {
    const db = client.db('wdyt-uca');
    return await db.collection('users').findOne(filter);
  },
  async create(userData) {
    const db = client.db('wdyt-uca');
    const salt = makeSalt();
    const hashedPassword = encryptPassword(userData.password, salt);

    const newUser = {
      email: userData.email,
      username: userData.username,
      hashedPassword: hashedPassword,
      salt: salt,
      tokens: [],
      roles: userData.roles || [],
      savedPosts: [],
      saldo: '10',
    };

    const result = await db.collection('users').insertOne(newUser);
    return result.ops[0];
  },
  comparePassword: function(hashedPassword, inputPassword, salt) {
    return hashedPassword === encryptPassword(inputPassword, salt);
  },
  // Agrega aquí otros métodos según sea necesario.
};

module.exports = User;
