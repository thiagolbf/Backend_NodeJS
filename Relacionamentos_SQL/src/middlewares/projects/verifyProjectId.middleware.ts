import { Request, Response, NextFunction } from "express";

import { Project } from "../../interfaces/projects.interface";

import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";

const verifyProjectIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;

  const queryString = `
    SELECT * from projects WHERE id = $1;  
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<Project> = await client.query(queryConfig);

  if (!queryResult.rows[0]) {
    return res.status(404).json({ message: "Project not found" });
  }

  next();
};

export { verifyProjectIdMiddleware };
