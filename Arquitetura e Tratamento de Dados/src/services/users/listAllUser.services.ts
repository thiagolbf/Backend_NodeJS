import { QueryResult } from "pg";
import { client } from "../../database/connection";

import { User, UserList } from "../../interfaces/user.interface";
import { userSchema, usersListSchema } from "../../schemas/user.schema";

export const listAllUsersService = async (): Promise<Array<UserList>> => {
  const queryString: string = `
    SELECT * FROM users;
    `;

  const queryResult: QueryResult<User> = await client.query(queryString);

  return usersListSchema.parse(queryResult.rows);
};
