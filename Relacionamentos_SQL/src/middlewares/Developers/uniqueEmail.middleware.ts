import { Developer } from "../../interfaces/developers.interface";

import { QueryConfig, QueryResult } from "pg";

import { NextFunction, Request, Response } from "express";
import { client } from "../../database";

const verifyDeveloperEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

  if (!email) {
    next();
  }

  const queryString = `
    SELECT * FROM developers WHERE email = $1;
    `;

  const queryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    return res.status(404).json({ message: "Email already exists." });
  }

  next();
};

export { verifyDeveloperEmail };
