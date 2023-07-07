import { client } from "../../database";

import { QueryConfig } from "pg";

const deleteProjectTechnologieService = async (
  projectId: string,
  technologieId: string
): Promise<void> => {
  const queryString: string = `
   DELETE FROM projects_technologies WHERE "projectId"= $1 AND "technologyId" = $2;
   `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId, technologieId],
  };

  await client.query(queryConfig);
};

export { deleteProjectTechnologieService };
