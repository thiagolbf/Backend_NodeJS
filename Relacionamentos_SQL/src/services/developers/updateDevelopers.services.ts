import format from "pg-format";

import { QueryResult } from "pg";
import { client } from "../../database";

import {
  DeveloperUpdate,
  Developer,
} from "../../interfaces/developers.interface";

const updateDeveloperService = async (
  payload: DeveloperUpdate,
  developerId: string
) => {
  const keys = Object.keys(payload).splice(0, 2);

  let keysToUpdate: Array<string> = [];

  const queryString: string = format(
    `
    UPDATE developers SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;
    `,
    keysToUpdate,
    Object.values(payload)
  );

  const queryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: QueryResult<Developer> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export { updateDeveloperService };

// const verify = (currentValue: string) => {
//   if (currentValue === "email" || currentValue === "name") {
//     keysToUpdate.push(currentValue);
//     return true;
//   }
// };

// const checkKeys = keys.some(verify);
