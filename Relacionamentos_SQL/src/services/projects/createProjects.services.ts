import { client } from "../../database";
import { Project, ProjectRequest } from "../../interfaces/projects.interface";

import format from "pg-format";
import { QueryResult } from "pg";

const createProjectsService = async (
  payload: ProjectRequest
): Promise<Project> => {
  const values = Object.values(payload);
  const keys = Object.keys(payload);

  const queryString: string = format(
    `
        INSERT INTO
            projects(%I)
        VALUES
            (%L)
        RETURNING *;    
  `,
    keys,
    values
  );

  const queryResult: QueryResult<Project> = await client.query(queryString);

  return queryResult.rows[0];
};

export { createProjectsService };
