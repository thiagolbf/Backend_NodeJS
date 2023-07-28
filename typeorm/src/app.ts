import "express-async-errors";
import { handleErrors } from "./errors";

import express, { Application, json } from "express";

import movieRouter from "./routers/movie.router";

const app: Application = express();
app.use(json());

app.use("/movies", movieRouter);

app.use(handleErrors);

export default app;
