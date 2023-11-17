import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { users, matchPassword } from "../models/User.js";

passport.use(new LocalStrategy({
  usernameField: 'email',
}, async (email, password, done) => {
  // Match Email's User
  const user = await users.findOne({ email: email });

  if (!user) {
    return done(null, false, { message: "Not User found." });
  }

  // Match Password's User
  console.log("Comparando contraseñas:", password, user.password);
  const isMatch = await matchPassword(password,user.password);
  if (!isMatch) {
    console.log("ERROR EN CONTRASEÑA");
    return done(null, false, { message: "Incorrect Password." });
  }
  
  return done(null, user);
})
);

passport.serializeUser((user, done) => {
  done(null, user._id);
  console.log("Serialize");

});

passport.deserializeUser((id, done) => {
  users.findOne({ _id: id }, (err, user) => {
    done(err, user);
    console.log("Deserialize");

  });
});


