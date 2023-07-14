import { QueryResult, QueryConfig } from "pg";
import { client } from "../../database/connection";

import { User, UserList } from "../../interfaces/user.interface";
import { userWithoutPasswordSchema } from "../../schemas/user.schema";

export const profileService = async (profileId: string): Promise<UserList> => {
  const queryString: string = `
    SELECT * FROM users WHERE id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [profileId],
  };

  const queryResult: QueryResult<User> = await client.query(queryConfig);

  return userWithoutPasswordSchema.parse(queryResult.rows[0]);
};
