import passport from "passport";
import { users, encryptPassword } from "../models/User.js";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

export const signup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }

  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }

  if (errors.length > 0) {
    return res.render("auth/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  // Look for email coincidence
  const userFound = await users.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "The Email is already in use.");
    return res.redirect("/auth/signup");
  }

  // Saving a New User
  const newUser = { name, email, password: await encryptPassword(password) };
  await users.insertOne(newUser);
  req.flash("success_msg", "You are registered.");
  res.redirect("/auth/signin");
};

export const renderSigninForm = (req, res) => res.render("auth/signin");

// Dentro de tu controlador de autenticación
export const signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // Manejar errores del servidor
    }
    if (!user) {
      // Autenticación fallida
      req.flash("error_msg", info.message); // O usa el mensaje de error de Passport
      console.log("Fallo en passport");
      return res.redirect("/auth/signin");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err); // Manejar errores al iniciar sesión
      }
      // Redirección en caso de éxito
      console.log("exito en passport");
      return res.redirect("/notes");
    });
  })(req, res, next);
};


export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/auth/signin");
  });
};
