import { NextFunction, Request, Response } from "express";
import { MovieRepo } from "../interfaces/movie.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

export const verifyMovieNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const repo: MovieRepo = AppDataSource.getRepository(Movie);
  const name: string = req.body.name;

  if (!name) {
    return next();
  }

  const movieExists: boolean = await repo.exist({ where: { name } });

  if (movieExists) {
    throw new AppError("Movie already exists", 409);
  }

  return next();
};
