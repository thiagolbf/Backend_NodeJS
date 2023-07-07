import { Request, Response, NextFunction } from "express";

import { client } from "../../database";
import { QueryConfig, QueryResult } from "pg";

const verifyProjectTechnologieMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const projectId = req.params.id;
  const technologie = res.locals.technologie;

  const queryString = `
    SELECT 
    FROM projects_technologies
    WHERE "projectId" = $1 AND "technologyId" = $2;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId, technologie.id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (req.method === "DELETE" && queryResult.rowCount === 0) {
    return res.status(404).json({
      message: `Technology ${technologie.name} not found on this Project.`,
    });
  } else if (queryResult.rowCount > 0 && req.method === "DELETE") {
    next();
  } else {
    if (queryResult.rowCount === 0) {
      next();
    } else {
      return res.status(404).json({
        message: `Technology already registred.`,
      });
    }
  }
};

export { verifyProjectTechnologieMiddleware };
