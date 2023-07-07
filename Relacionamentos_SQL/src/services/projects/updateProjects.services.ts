import format from "pg-format";

import { QueryResult } from "pg";
import { client } from "../../database";

import { ProjectUpdate, Project } from "../../interfaces/projects.interface";

const updateProjectsService = async (
  payload: ProjectUpdate,
  projectId: string
) => {
  const keys = Object.keys(payload);
  const values = Object.values(payload);

  const queryString: string = format(
    `
    UPDATE projects SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;
    `,
    keys,
    values
  );

  const queryConfig = {
    text: queryString,
    values: [projectId],
  };

  const queryResult: QueryResult<Project> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export { updateProjectsService };
