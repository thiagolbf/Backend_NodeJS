import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";

export type SessionRequest = z.infer<typeof sessionSchema>;
