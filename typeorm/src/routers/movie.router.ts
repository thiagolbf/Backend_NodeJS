import { Router } from "express";
import { createMovieController } from "../controllers/movie.controller";

import { verifyMovieNameMiddleware } from "../middlewares/verifyMovieName.middleware";

const movieRouter: Router = Router();

movieRouter.post("", verifyMovieNameMiddleware, createMovieController);

export default movieRouter;
