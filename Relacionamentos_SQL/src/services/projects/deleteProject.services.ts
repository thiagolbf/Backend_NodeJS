import { client } from "../../database";

import { QueryConfig } from "pg";

const deleteProjectService = async (projectId: string): Promise<void> => {
  const queryString: string = `
   DELETE FROM projects WHERE id = $1;
   `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId],
  };

  await client.query(queryConfig);
};

export { deleteProjectService };
