import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(20),
  email: z.string().max(100).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  active: z.boolean().default(true),
});

const createUserSchema = userSchema.omit({ id: true, active: true });
const updateUserSchema = userSchema.partial().omit({ id: true });
const paramsIdSchema = userSchema.omit({
  name: true,
  email: true,
  password: true,
  admin: true,
  active: true,
});

const userWithoutPasswordSchema = userSchema.omit({ password: true });

const usersListSchema = userWithoutPasswordSchema.array();

export {
  userSchema,
  createUserSchema,
  updateUserSchema,
  userWithoutPasswordSchema,
  usersListSchema,
  paramsIdSchema,
};
