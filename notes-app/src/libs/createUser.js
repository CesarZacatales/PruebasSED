import { users, encryptPassword } from "../models/User.js";

export const createAdminUser = async () => {
  const userFound = await users.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = {
    username: "admin",
    email: "admin@localhost",
    password: await encryptPassword("adminpassword")
  };

  const result = await users.insertOne(newUser);

  if (result.insertedId) {
    console.log("Admin user created with ID:", result.insertedId);
  } else {
    console.log("Admin user was not created");
  }
};
