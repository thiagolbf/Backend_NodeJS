import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors";

import { client } from "../database/connection";
import { QueryConfig, QueryResult } from "pg";

export const verifyUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

  if (!email) next();

  const queryString = `
  SELECT * FROM users WHERE email = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  next();
};
