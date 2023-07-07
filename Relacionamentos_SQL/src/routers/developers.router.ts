import { Router } from "express";

import { verifyDevelopersKeys } from "../middlewares/Developers/verifyDevelopersKeys.middleware";
import { verifyDeveloperEmail } from "../middlewares/Developers/uniqueEmail.middleware";
import { verifyDeveloperIdMiddleware } from "../middlewares/Developers/verifyDeveloperId.middleware";
import { verifyInfoKeys } from "../middlewares/Developers/verifyInfoKeys.middlewares";
import { verifyDeveloperInfoIdMiddleware } from "../middlewares/Developers/verifyDeveloperInfoId.middleware";

import { createDevelopersController } from "../controller/developers.controller";
import { listDevelopersController } from "../controller/developers.controller";
import { listDeveloperController } from "../controller/developers.controller";
import { updateDeveloperController } from "../controller/developers.controller";
import { updateInfoController } from "../controller/developers.controller";
import { createDeveloperInfoController } from "../controller/developers.controller";
import { deleteDeveloperController } from "../controller/developers.controller";

const developersRouter: Router = Router();

developersRouter.post(
  "",
  verifyDevelopersKeys,
  verifyDeveloperEmail,
  createDevelopersController
);
developersRouter.post(
  "/:id/infos",
  verifyDeveloperIdMiddleware,
  verifyInfoKeys,
  verifyDeveloperInfoIdMiddleware,
  createDeveloperInfoController
);

developersRouter.get("", listDevelopersController);
developersRouter.get(
  "/:id",
  verifyDeveloperIdMiddleware,
  listDeveloperController
);

developersRouter.patch(
  "/:id",
  verifyDeveloperIdMiddleware,
  verifyDevelopersKeys,
  verifyDeveloperEmail,
  updateDeveloperController
);

developersRouter.patch(
  "/:id/infos",
  verifyDeveloperInfoIdMiddleware,
  verifyInfoKeys,
  updateInfoController
);

developersRouter.delete(
  "/:id",
  verifyDeveloperIdMiddleware,
  deleteDeveloperController
);

export default developersRouter;
