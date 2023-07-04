type Movie = {
  id: number;
  name: string;
  description?: string | undefined;
  duration: number;
  price: number;
};

type Pagination = {
  prevPage: string | null;
  nextPage: string | null;
  data: Movie[];
};

type MovieRequest = Omit<Movie, "id">;

export { Movie, MovieRequest, Pagination };
