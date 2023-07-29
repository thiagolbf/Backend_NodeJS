import { Router } from "express";
import { createMovieController } from "../controllers/movie.controller";
import { deleteMovieController } from "../controllers/movie.controller";
import { updateMovieController } from "../controllers/movie.controller";
import { listMovieController } from "../controllers/movie.controller";

import { verifyMovieNameMiddleware } from "../middlewares/verifyMovieName.middleware";
import { verifyMovieId } from "../middlewares/verifyMovieId.middleware";
import { paginationMiddleware } from "../middlewares/pagination.middleware";

const movieRouter: Router = Router();

movieRouter.post("", verifyMovieNameMiddleware, createMovieController);
movieRouter.delete("/:id", verifyMovieId, deleteMovieController);
movieRouter.patch(
  "/:id",
  verifyMovieId,
  verifyMovieNameMiddleware,
  updateMovieController
);

movieRouter.get("", paginationMiddleware, listMovieController);

export default movieRouter;
