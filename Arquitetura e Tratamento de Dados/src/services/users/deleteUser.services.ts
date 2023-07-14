import { client } from "../../database/connection";
import { AppError } from "../../errors";

import { User } from "../../interfaces/user.interface";

import { QueryConfig, QueryResult } from "pg";

export const deleteUserService = async (userId: string): Promise<void> => {
  const queryStringConsult: string = `
    SELECT * FROM users WHERE active = false AND id = $1;
    `;

  const queryStringConsultConfig: QueryConfig = {
    text: queryStringConsult,
    values: [userId],
  };

  const queryResult: QueryResult<User> = await client.query(
    queryStringConsultConfig
  );

  if (queryResult.rowCount > 0) {
    throw new AppError("User already deleted", 400);
  }

  const queryString: string = `
    UPDATE users SET active = false WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);
};
