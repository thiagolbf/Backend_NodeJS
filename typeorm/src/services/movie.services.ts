import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

import {
  Pagination,
  PaginationParams,
} from "../interfaces/pagination.interfaces";
import {
  MovieRequest,
  MovieUpdate,
  MovieRepo,
} from "../interfaces/movie.interfaces";

import { createMovieSchema } from "../schemas/movie.schemas";

export const createMovieService = async (
  payload: MovieRequest
): Promise<Movie> => {
  const validatedData = createMovieSchema.parse(payload);

  const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);

  const newMovie = movieRepo.create(validatedData);

  await movieRepo.save(newMovie);

  return newMovie;
};
