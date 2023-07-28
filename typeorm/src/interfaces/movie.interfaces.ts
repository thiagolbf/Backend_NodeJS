import { z } from "zod";
import { createMovieSchema } from "../schemas/movie.schemas";
import { Movie } from "../entities";
import { DeepPartial, Repository } from "typeorm";

type MovieRequest = z.infer<typeof createMovieSchema>;
type MovieRead = Array<Movie>;
type MovieUpdate = DeepPartial<MovieRequest>;

type MovieRepo = Repository<Movie>;

export { MovieRequest, MovieRead, MovieUpdate, MovieRepo };
