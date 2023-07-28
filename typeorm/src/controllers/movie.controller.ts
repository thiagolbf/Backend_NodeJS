import { Request, Response } from "express";
import { Movie } from "../entities";
import { createMovieService } from "../services/movie.services";

export const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movie: Movie = await createMovieService(req.body);

  return res.status(201).json(movie);
};
