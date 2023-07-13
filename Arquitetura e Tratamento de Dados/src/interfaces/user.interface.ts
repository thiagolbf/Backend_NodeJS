import { z } from "zod";

import {
  userSchema,
  createUserSchema,
  userWithoutPassword,
} from "../schemas/user.schema";

type User = z.infer<typeof userSchema>;
type UserRequest = z.infer<typeof createUserSchema>;
type UserList = z.infer<typeof userWithoutPassword>;

export { User, UserRequest, UserList };
