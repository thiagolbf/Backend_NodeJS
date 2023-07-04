import { Request, Response, NextFunction } from "express";
import { Movie, MovieRequest } from "./interfaces";

import { client } from "./database";

import { QueryConfig, QueryResult } from "pg";

const checkMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString = `
    SELECT
    *
    FROM
      movies
    WHERE
     id = $1;
  
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<Movie> = await client.query(queryConfig);

  if (!queryResult.rows[0]) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.locals = { ...res.locals, movie: queryResult.rows[0] };

  next();
};

const checkIfMovieNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const name: string = req.body.name;
  const message = "Movie already exists";

  console.log(name);
  const queryString = `
    SELECT 
    *
     FROM 
         movies
      WHERE 
      name = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name],
  };

  const queryResult: QueryResult<Movie> = await client.query(queryConfig);
  const foundMoiveName = queryResult.rows[0];

  if (foundMoiveName) {
    return res.status(409).json({ message });
  }

  next();
};

export { checkIfMovieNameExistsMiddleware, checkMovieId };
