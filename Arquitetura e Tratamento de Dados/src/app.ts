import "express-async-errors";
import { handleErrors } from "./errors";

import express, { Application, json } from "express";

import { usersRouter } from "./routers/users.router";
import { sessionRouter } from "./routers/session.router";

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);
app.use("/login", sessionRouter);

app.use(handleErrors);

export default app;
