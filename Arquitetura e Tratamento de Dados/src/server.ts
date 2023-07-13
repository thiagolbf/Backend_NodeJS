import app from "./app";
import { initializeDatabase } from "./database/connection";
import "dotenv/config";

const port: number = Number(process.env.PORT || 3000);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await initializeDatabase();
});
