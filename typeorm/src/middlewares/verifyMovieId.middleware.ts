import { Request, Response, NextFunction } from "express";
import { MovieRepo } from "../interfaces/movie.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

export const verifyMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieId: number = Number(req.params.id);

  const repo: MovieRepo = AppDataSource.getRepository(Movie);

  const movie = await repo.findOne({ where: { id: movieId } });

  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  res.locals = { ...res.locals, movie };

  return next();
};
