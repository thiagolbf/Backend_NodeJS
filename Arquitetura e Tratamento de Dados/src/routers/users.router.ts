import { Router } from "express";

import { createUserController } from "../controllers/users.controller";
import { listAllUsersController } from "../controllers/users.controller";

import { verifyUserEmail } from "../middleware/verifyUserEmail.middleware";

import { verifyToken } from "../middleware/verifyToken.middleware";
import { validateAdmin } from "../middleware/verifyAdmin.middleware";

const usersRouter: Router = Router();

usersRouter.post("", verifyUserEmail, createUserController);
usersRouter.get("", verifyToken, validateAdmin, listAllUsersController);

export { usersRouter };
