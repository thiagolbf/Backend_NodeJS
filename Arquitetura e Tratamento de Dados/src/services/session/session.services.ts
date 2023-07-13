import "dotenv/config";

import { client } from "../../database/connection";
import { QueryResult, QueryConfig } from "pg";

import { AppError } from "../../errors";
import { compare } from "bcryptjs";

import { User } from "../../interfaces/user.interface";
import { SessionRequest } from "../../interfaces/session.interface";
import { sessionSchema } from "../../schemas/session.schema";

import { sign } from "jsonwebtoken";

export const sessionService = async (
  payload: SessionRequest
): Promise<string> => {
  const validatedData = sessionSchema.parse(payload);

  const queryString: string = `
  SELECT * FROM users WHERE email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [validatedData.email],
  };

  const queryResult: QueryResult<User> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  console.log(queryResult.rowCount);

  const checkPassword = await compare(
    validatedData.password,
    queryResult.rows[0].password
  );

  if (!checkPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  if (!queryResult.rows[0].active) {
    throw new AppError("This developer is inactive", 401);
  }

  const token: string = sign(
    { email: queryResult.rows[0].email, admin: queryResult.rows[0].admin },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};
