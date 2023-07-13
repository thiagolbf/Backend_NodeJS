import { Router } from "express";

import { sessionController } from "../controllers/session.controller";

const sessionRouter: Router = Router();

sessionRouter.post("", sessionController);

export { sessionRouter };
