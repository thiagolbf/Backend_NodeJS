import { Router } from "express";

import { verifyDeveloperIdBodyMiddleware } from "../middlewares/projects/veirfyDeveloperIdBody.middleware";
import { verifyProjectsKeys } from "../middlewares/projects/verifyProjectKeys.middleware";
import { verifyProjectIdMiddleware } from "../middlewares/projects/verifyProjectId.middleware";
import { verifyTechnologieMiddleware } from "../middlewares/projects/verifyTechnologie.middleware";
import { verifyProjectTechnologieMiddleware } from "../middlewares/projects/verifyTechnologieProject.middleware";
import { verifyTechnologieParamsMiddleware } from "../middlewares/projects/verifyTechnologieParams.middleware";

import { createProjectsController } from "../controller/projects.controller";
import { createProjectTechnologieController } from "../controller/projects.controller";
import { updateProjectsController } from "../controller/projects.controller";
import { deleteProjectController } from "../controller/projects.controller";
import { deleteTechnologieProjectController } from "../controller/projects.controller";
import { listProjectssController } from "../controller/projects.controller";
import { listProjectController } from "../controller/projects.controller";

const projectsRouter: Router = Router();

projectsRouter.post(
  "",
  verifyProjectsKeys,
  verifyDeveloperIdBodyMiddleware,
  createProjectsController
);

projectsRouter.post(
  "/:id/technologies",
  verifyProjectIdMiddleware,
  verifyTechnologieMiddleware,
  verifyProjectTechnologieMiddleware,
  createProjectTechnologieController
);

projectsRouter.patch(
  "/:id",
  verifyProjectIdMiddleware,
  verifyProjectsKeys,
  verifyDeveloperIdBodyMiddleware,
  updateProjectsController
);

projectsRouter.delete(
  "/:id",
  verifyProjectIdMiddleware,
  deleteProjectController
);

projectsRouter.delete(
  "/:id/:name",
  verifyProjectIdMiddleware,
  verifyTechnologieParamsMiddleware,
  verifyProjectTechnologieMiddleware,
  deleteTechnologieProjectController
);

projectsRouter.get("", listProjectssController);
projectsRouter.get("/:id", verifyProjectIdMiddleware, listProjectController);

export default projectsRouter;
