import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";
import {connectDB} from './database.js'

async function main() {
  await connectDB();
  await createAdminUser();
  app.listen(app.get("port"));

  console.log("Server on port", app.get("port"));
  console.log("Environment:", process.env.NODE_ENV);
}

main().catch(console.error);
