import { Request, Response } from "express";
import { Movie, MovieRequest, Pagination } from "./interfaces";

import { client } from "./database";

import { Query, QueryConfig, QueryResult } from "pg";
import format from "pg-format";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const movieData: MovieRequest = req.body;

  const queryString = format(
    `
        INSERT INTO
            movies
        (%I)
        VALUES
        (%L)
        RETURNING *;
        `,
    Object.keys(movieData),
    Object.values(movieData)
  );

  const queryResult: QueryResult<Movie> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const id: number = res.locals.movie.id;

  const queryString = `
    DELETE
    FROM
    movies
    WHERE
    id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);

  return res.status(204).json();
};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const bodyMovie: Partial<Movie> = req.body;

  const movie: Movie = res.locals.movie;
  const idMovie = movie.id;

  const queryString = format(
    `
      UPDATE
        MOVIES
        set(%I) = ROW(%L)
        WHERE
        id = $1
        RETURNING *;
    `,
    Object.keys(bodyMovie),
    Object.values(bodyMovie)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idMovie],
  };

  const queryResult: QueryResult<Movie> = await client.query(queryConfig);

  return res.json(queryResult.rows[0]);
};

const listAllMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let page: number = Number(req.query.page) || 1;
  let perPage: number = Number(req.query.perPage) || 5;

  let valueOfSort = req.query.sort;
  let valueOfOrder = req.query.order;

  let queryString: string;
  let queryConfig: QueryConfig;
  let queryResult: QueryResult<Movie>;
  let pagination: Pagination;

  const baseUrl = `http://localhost:3000/movies`;
  let prevPage: string | null = `${baseUrl}?page=${
    page - 1
  }&perPage=${perPage}`;
  let nextPage: string | null = `${baseUrl}?page=${
    page + 1
  }&perPage=${perPage}`;

  const queryVerifyDataLength = `
  SELECT COUNT(*) as count FROM movies
  `;

  const queryVerifyResult = await client.query(queryVerifyDataLength);

  if (queryVerifyResult.rows[0].count - (perPage * (page + 1) - perPage) <= 0) {
    nextPage = null;
  }

  if (
    queryVerifyResult.rows[0].count - (perPage * (page - 1) - perPage) <= 0 ||
    page === 1
  ) {
    prevPage = null;
  }

  switch (valueOfSort) {
    case "price":
      if (valueOfOrder === "DESC") {
        queryString = `
            SELECT * FROM movies
            ORDER BY price DESC
            OFFSET $1 LIMIT $2;
            `;
      } else {
        queryString = `
        SELECT * FROM movies
        ORDER BY price
        OFFSET $1 LIMIT $2;
        `;
      }

      queryConfig = {
        text: queryString,
        values: [perPage * (page - 1), perPage],
      };

      queryResult = await client.query(queryConfig);

      pagination = {
        prevPage: prevPage,
        nextPage: nextPage,
        data: queryResult.rows,
      };
      return res.status(200).json(pagination);

    case "duration":
      if (valueOfOrder === "DESC") {
        queryString = `
          SELECT * FROM movies
          ORDER BY price DESC
          OFFSET $1 LIMIT $2;
          `;
      } else {
        queryString = `
        SELECT * FROM movies
        ORDER BY price 
        OFFSET $1 LIMIT $2;
        `;
      }

      queryConfig = {
        text: queryString,
        values: [perPage * (page - 1), perPage],
      };

      queryResult = await client.query(queryConfig);

      pagination = {
        prevPage: prevPage,
        nextPage: nextPage,
        data: queryResult.rows,
      };
      return res.status(200).json(pagination);

    default:
      queryString = `
    SELECT * FROM movies
    OFFSET $1 LIMIT $2;
  `;

      queryConfig = {
        text: queryString,
        values: [perPage * (page - 1), perPage],
      };

      queryResult = await client.query(queryConfig);

      pagination = {
        prevPage: prevPage,
        nextPage: nextPage,
        data: queryResult.rows,
      };
      return res.status(200).json(pagination);
  }
};

export { createMovie, listAllMovies, deleteMovie, updateMovie };

// const queryString = `
//     SELECT
//         *
//     FROM
//     movies
//     ;
// `;

// if (req.query.sort === ("price" || "duration")) {
//   console.log("bichao do mato");
// }
