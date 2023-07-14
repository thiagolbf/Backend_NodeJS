import { z } from "zod";

import {
  userSchema,
  createUserSchema,
  updateUserSchema,
  userWithoutPasswordSchema,
  usersListSchema,
  paramsIdSchema,
} from "../schemas/user.schema";

type User = z.infer<typeof userSchema>;
type UserRequest = z.infer<typeof createUserSchema>;
type UserUpdate = z.infer<typeof updateUserSchema>;
type UserList = z.infer<typeof userWithoutPasswordSchema>;
type usersList = z.infer<typeof usersListSchema>;
type paramsUserId = z.infer<typeof paramsIdSchema>;

export { User, UserRequest, UserList, usersList, UserUpdate, paramsUserId };
