import { client } from "../../database";
import {
  DeveloperRequest,
  Developer,
} from "../../interfaces/developers.interface";

import format from "pg-format";
import { QueryResult } from "pg";

const createDevelopersService = async (
  payload: DeveloperRequest
): Promise<Developer> => {
  const values = Object.values(payload).splice(0, 2);
  const keys = Object.keys(payload).splice(0, 2);

  const queryString: string = format(
    `
        INSERT INTO
            developers(%I)
        VALUES
            (%L)
        RETURNING *;    
  `,
    keys,
    values
  );

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows[0];
};

export { createDevelopersService };
