import { User, UserRequest, UserList } from "../../interfaces/user.interface";
import {
  createUserSchema,
  userWithoutPassword,
} from "../../schemas/user.schema";

import { client } from "../../database/connection";

import format from "pg-format";
import { QueryResult } from "pg";

import { hash } from "bcryptjs";

export const createUserService = async (
  payload: UserRequest
): Promise<UserList> => {
  const validatedData = createUserSchema.parse(payload);

  validatedData.password = await hash(validatedData.password, 10);

  const queryString: string = format(
    `
    INSERT INTO users (%I) VALUES (%L) RETURNING *;
  
  `,
    Object.keys(validatedData),
    Object.values(validatedData)
  );

  const queryResult: QueryResult<User> = await client.query(queryString);

  return userWithoutPassword.parse(queryResult.rows[0]);
};
