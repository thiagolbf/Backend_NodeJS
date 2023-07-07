import { client } from "../../database";

import { QueryConfig } from "pg";

const deleteDeveloperService = async (developerId: string): Promise<void> => {
  const queryString: string = `
   DELETE FROM developers WHERE id = $1;
   `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  await client.query(queryConfig);
};

export { deleteDeveloperService };
