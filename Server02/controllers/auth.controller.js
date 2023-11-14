const User = require("../models/User.model");
const debug = require("debug")("app:auth-controller");
const ROLES = require("../data/roles.constants.json");

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

    if (existingUser) {
      return res.status(409).json({ error: "Este usuario ya existe" });
    }

    const newUser = await User.create({
      username: username,
      email: email,
      password: password, // Este password será encriptado dentro de User.create
      roles: [ROLES.USER]
    });

    // No es necesario llamar a save() ya que User.create maneja la inserción
    return res.status(201).json({ message: "Usuario creado con éxito!", user: newUser });
  } catch (error) {
    debug({ error });
    return res.status(500).json({ error: "Error inesperado" });
  }
};

controller.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    if (!User.comparePassword(user.hashedPassword, password, user.salt)) {
      return res.status(401).json({ error: "Contraseña no coincide" });
    }

    const token = createToken(user._id);

    // Aquí debes actualizar el array de tokens del usuario en la base de datos
    // Puedes necesitar un método de actualización en tu modelo de usuario o realizar la operación directamente aquí

    return res.status(200).json({ token: token });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" });
  }
};

controller.whoami = async (req, res) => {
  try {
    // Suponiendo que req.user ya está poblado por el middleware de autenticación
    const { _id, username, email, roles, saldo } = req.user;
    return res.status(200).json({ _id, username, email, roles, saldo });
  } catch (error) {
    debug(error);
    return res.status(500).json({ error: "Error inesperado" });
  }
};

module.exports = controller;
