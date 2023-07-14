import { client } from "../../database/connection";
import { AppError } from "../../errors";

import { User, UserList } from "../../interfaces/user.interface";

import { userWithoutPasswordSchema } from "../../schemas/user.schema";

import { QueryConfig, QueryResult } from "pg";

export const recoverUserService = async (userId: string): Promise<UserList> => {
  const queryStringConsult: string = `
    SELECT * FROM users WHERE active = true AND id = $1;
    `;

  const queryStringConsultConfig: QueryConfig = {
    text: queryStringConsult,
    values: [userId],
  };

  const queryResult: QueryResult<User> = await client.query(
    queryStringConsultConfig
  );

  if (queryResult.rowCount > 0) {
    throw new AppError("User already active", 400);
  }

  const queryString: string = `
    UPDATE users SET active = true WHERE id = $1 RETURNING*;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResultRecover: QueryResult<User> = await client.query(queryConfig);

  return userWithoutPasswordSchema.parse(queryResultRecover.rows[0]);
};
