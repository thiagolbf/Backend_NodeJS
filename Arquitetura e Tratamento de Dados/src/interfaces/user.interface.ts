import { z } from "zod";

import {
  userSchema,
  createUserSchema,
  userWithoutPasswordSchema,
  usersListSchema,
} from "../schemas/user.schema";

type User = z.infer<typeof userSchema>;
type UserRequest = z.infer<typeof createUserSchema>;
type UserList = z.infer<typeof userWithoutPasswordSchema>;
type usersList = z.infer<typeof usersListSchema>;

export { User, UserRequest, UserList, usersList };
