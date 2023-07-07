import { Request, Response, NextFunction } from "express";

import { Info } from "../../interfaces/developers.interface";

import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";

const verifyDeveloperInfoIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;

  const queryString = `
  SELECT * from developer_infos WHERE id = $1;  
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<Info> = await client.query(queryConfig);

  if (!queryResult.rows[0]) {
    return res.status(404).json({ message: "Developer info not found." });
  }

  next();
};

export { verifyDeveloperInfoIdMiddleware };
