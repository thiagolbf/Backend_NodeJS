import { Request, Response, NextFunction } from "express";

import { Developer } from "../../interfaces/developers.interface";

import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";

const verifyDeveloperIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;

  const queryString = `
    SELECT * from developers WHERE id = $1;  
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<Developer> = await client.query(queryConfig);

  if (!queryResult.rows[0]) {
    return res.status(404).json({ message: "Developer not found" });
  }

  next();
};

export { verifyDeveloperIdMiddleware };
