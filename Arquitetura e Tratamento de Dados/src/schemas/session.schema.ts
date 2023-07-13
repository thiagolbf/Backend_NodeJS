import { z } from "zod";

export const sessionSchema = z.object({
  email: z.string().max(100).email(),
  password: z.string().max(120),
});
