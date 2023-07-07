import { Request, Response, NextFunction } from "express";

import {
  Technologie,
  TechnologieRequest,
} from "../../interfaces/projects.interface";

import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";

const verifyTechnologieMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Must send technologie.",
    });
  }

  const queryString = `
    SELECT * from technologies WHERE name = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name],
  };

  const queryResult: QueryResult<Technologie> = await client.query(queryConfig);

  const technologie = queryResult.rows[0];

  if (!queryResult.rows[0]) {
    return res.status(404).json({
      message: "Technology not supported.",
      options: [
        "JavaScript",
        "Python",
        "React",
        "Express.js",
        "HTML",
        "CSS",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ],
    });
  }
  res.locals = { ...res.locals, technologie };
  next();
};

export { verifyTechnologieMiddleware };
