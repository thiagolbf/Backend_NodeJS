import { Request, Response, NextFunction } from "express";

import { User } from "../interfaces/user.interface";

import { paramsIdSchema } from "../schemas/user.schema";

import { client } from "../database/connection";
import { QueryConfig, QueryResult } from "pg";

import { AppError } from "../errors";

export const verifyUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryString = `
    SELECT * FROM users WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.id],
  };

  const queryResult: QueryResult<User> = await client.query(queryConfig);

  if (!queryResult.rows[0]) {
    throw new AppError("User not found", 404);
  }

  next();
};
