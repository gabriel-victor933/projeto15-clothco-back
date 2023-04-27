import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.DATABASE_URL;
const dbConnection = async () => {
  const database = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await database.connect();
    return database.db();
  } catch (err) {
    console.log({ message: err.message });
  }
};
export const db = await dbConnection();
