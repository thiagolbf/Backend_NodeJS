import { Request, Response } from "express";

import {
  Project,
  ProjectRequest,
  ProjectWithTechnology,
} from "../interfaces/projects.interface";

import { createProjectsService } from "../services/projects/createProjects.services";
import { updateProjectsService } from "../services/projects/updateProjects.services";
import { deleteProjectService } from "../services/projects/deleteProject.services";
import { listProjectsService } from "../services/projects/listProjects.services";
import { listProjectService } from "../services/projects/listProjects.services";
import { createProjectTechnologieService } from "../services/projects/createProjectTechnologie.services";
import { deleteProjectTechnologieService } from "../services/projects/deleteProjectTechnologie.services";

const createProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectData: ProjectRequest = res.locals.objProject;

  const newProject: Project = await createProjectsService(projectData);

  return res.status(201).json(newProject);
};

const createProjectTechnologieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const technologie = res.locals.technologie;
  const id = req.params.id;

  const projectTechnologie = await createProjectTechnologieService(
    technologie.id,
    id
  );

  return res.status(201).json(projectTechnologie);
};

const listProjectssController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projects: Array<ProjectWithTechnology> = await listProjectsService();

  return res.status(200).json(projects);
};

const listProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const project = await listProjectService(req.params.id);

  return res.status(200).json(project);
};

const updateProjectsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectData: ProjectRequest = res.locals.objProject;
  const id = req.params.id;

  const projectUpdated: Project = await updateProjectsService(projectData, id);

  return res.status(201).json(projectUpdated);
};

const deleteProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteProjectService(req.params.id);

  return res.status(204).json();
};

const deleteTechnologieProjectController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const technologie = res.locals.technologie;
  const id = req.params.id;

  await deleteProjectTechnologieService(id, technologie.id);
  return res.status(204).json();
};

export {
  createProjectsController,
  updateProjectsController,
  deleteProjectController,
  listProjectssController,
  listProjectController,
  createProjectTechnologieController,
  deleteTechnologieProjectController,
};
