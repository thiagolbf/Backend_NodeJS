import { Client } from "pg";
import "dotenv/config";

const client: Client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

const initializeDatabase = async (): Promise<void> => {
  await client.connect();

  console.log("Database Connected");
};

export { initializeDatabase, client };
