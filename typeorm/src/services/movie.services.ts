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

import { createMovieSchema, updateMovieSchema } from "../schemas/movie.schemas";

type ValidatedMovieData = {
  name: string;
  description?: string | null;
  duration: number;
  price: number;
};

export const createMovieService = async (
  payload: MovieRequest
): Promise<Movie> => {
  const validatedData = createMovieSchema.parse(payload);

  const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);

  const newMovie = movieRepo.create(validatedData);

  await movieRepo.save(newMovie);

  return newMovie;
};

export const updateMovieService = async (
  movie: Movie,
  payload: MovieUpdate
): Promise<Movie> => {
  const validatedData = updateMovieSchema.parse(payload) as ValidatedMovieData;

  const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);

  return await movieRepo.save({ ...movie, ...validatedData });
};

export const deleteMovieService = async (movie: Movie): Promise<void> => {
  const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);

  await movieRepo.remove(movie);
};

export const listMoviesService = async ({
  page,
  perPage,
  order,
  sort,
  prevPage,
  nextPage,
}: PaginationParams): Promise<Pagination> => {
  const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);

  const [movies, count]: [Movie[], number] = await movieRepo.findAndCount({
    order: { [sort]: order },
    skip: page, //offset
    take: perPage, //limit
  });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: movies,
  };
};
