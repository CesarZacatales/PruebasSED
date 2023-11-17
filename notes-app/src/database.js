import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./config.js";

const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}


export { db, client };
