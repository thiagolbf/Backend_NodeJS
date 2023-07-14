import format from "pg-format";
import { client } from "../../database/connection";
import { hash } from "bcryptjs";

import { UserUpdate, UserList, User } from "../../interfaces/user.interface";
import {
  userWithoutPasswordSchema,
  updateUserSchema,
} from "../../schemas/user.schema";
import { QueryConfig, QueryResult } from "pg";

export const updateUserService = async (
  userId: string,
  payload: UserUpdate
): Promise<UserList> => {
  const validatedBody = updateUserSchema.parse(payload);

  if (validatedBody.password) {
    validatedBody.password = await hash(validatedBody.password, 10);
  }

  const queryString = format(
    `
    UPDATE users SET (%I) = ROW (%L) WHERE id = $1 RETURNING*;
    
    `,
    Object.keys(validatedBody),
    Object.values(validatedBody)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<User> = await client.query(queryConfig);

  return userWithoutPasswordSchema.parse(queryResult.rows[0]);
};
