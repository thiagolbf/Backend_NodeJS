import { Router } from "express";

import { createUserController } from "../controllers/users.controller";

import { verifyUserEmail } from "../middleware/verifyUserEmail.middleware";

const usersRouter: Router = Router();

usersRouter.post("", verifyUserEmail, createUserController);

export { usersRouter };
