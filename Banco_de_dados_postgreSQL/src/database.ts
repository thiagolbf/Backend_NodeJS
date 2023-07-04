import { Client } from "pg";

const client = new Client({
  user: "thiag",
  host: "localhost",
  port: 5432,
  password: "1234",
  database: "primeira_conexao",
});

const initializeDatabase = async (): Promise<void> => {
  //   try {
  await client.connect();
  console.log("Database connected");
  //   } catch (error) {
  //     console.log("Error connecting to the database: ", error);
  //   }
};

export { initializeDatabase, client };
