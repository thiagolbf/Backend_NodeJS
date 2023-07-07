import { client } from "../../database";

import { ProjectWithTechnologyWithoutDev } from "../../interfaces/projects.interface";

import format from "pg-format";
import { QueryResult, QueryConfig } from "pg";

const createProjectTechnologieService = async (
  payload: string,
  projectId: string
): Promise<ProjectWithTechnologyWithoutDev> => {
  const queryString: string = format(`
    
    INSERT INTO
        projects_technologies ("addedIn", "projectId", "technologyId")
    VALUES
     ($1, $2, $3);
        
    `);

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [new Date(), projectId, payload],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export { createProjectTechnologieService };
