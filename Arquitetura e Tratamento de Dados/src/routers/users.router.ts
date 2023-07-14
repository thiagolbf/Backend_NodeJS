import { Router } from "express";

import { createUserController } from "../controllers/users.controller";
import { listAllUsersController } from "../controllers/users.controller";
import { profileController } from "../controllers/users.controller";
import { updateUserController } from "../controllers/users.controller";
import { deleteUserController } from "../controllers/users.controller";
import { recoverUserController } from "../controllers/users.controller";

import { verifyUserEmail } from "../middleware/verifyUserEmail.middleware";
import { verifyUserId } from "../middleware/verifyUserId.middleware";

import { verifyToken } from "../middleware/verifyToken.middleware";
import { validateAdmin } from "../middleware/verifyAdmin.middleware";
import { verifyUserPermission } from "../middleware/verifyUserPermission.middleware";

const usersRouter: Router = Router();

usersRouter.post("", verifyUserEmail, createUserController);
usersRouter.get("", verifyToken, validateAdmin, listAllUsersController);
usersRouter.get("/profile", verifyToken, profileController);
usersRouter.patch(
  "/:id",
  verifyUserId,
  verifyUserEmail,
  verifyToken,
  verifyUserPermission,
  updateUserController
);

usersRouter.patch(
  "/:id/recover",
  verifyUserId,
  verifyToken,
  validateAdmin,
  recoverUserController
);

usersRouter.delete(
  "/:id",
  verifyUserId,
  verifyToken,
  verifyUserPermission,
  deleteUserController
);

export { usersRouter };
