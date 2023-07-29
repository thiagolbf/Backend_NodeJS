import { Request, Response } from "express";
import { Movie } from "../entities";

import { createMovieService } from "../services/movie.services";
import { deleteMovieService } from "../services/movie.services";
import { updateMovieService } from "../services/movie.services";
import { listMoviesService } from "../services/movie.services";

export const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movie: Movie = await createMovieService(req.body);

  return res.status(201).json(movie);
};

export const listMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const moviesWithPagination = await listMoviesService(res.locals.pagination);

  return res.status(200).json(moviesWithPagination);
};

export const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteMovieService(res.locals.movie);

  return res.status(204).json();
};

export const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieUpdate = await updateMovieService(res.locals.movie, req.body);

  return res.status(200).json(movieUpdate);
};
