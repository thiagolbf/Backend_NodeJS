import express, { Application } from "express";

import { initializeDatabase } from "./database";

import { createMovie, deleteMovie, listAllMovies, updateMovie } from "./logic";
import { checkIfMovieNameExistsMiddleware, checkMovieId } from "./middlewares";

const port: number = 3000;
const app: Application = express();
app.use(express.json());

app.get("/movies", listAllMovies);

app.delete("/movies/:id", checkMovieId, deleteMovie);

app.post("/movies", checkIfMovieNameExistsMiddleware, createMovie);

app.patch(
  "/movies/:id",
  checkMovieId,
  checkIfMovieNameExistsMiddleware,
  updateMovie
);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await initializeDatabase();
});
