import express, { Application, json } from "express";

import developersRouter from "./routers/developers.router";
import projectsRouter from "./routers/projects.router";

const app: Application = express();
app.use(json());

app.use("/developers", developersRouter);
app.use("/projects", projectsRouter);

export default app;
