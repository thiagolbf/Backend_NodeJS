import { Request, Response } from "express";

import {
  DeveloperRequest,
  Developer,
  DevelopersWithInfo,
} from "../interfaces/developers.interface";

import { createDevelopersService } from "../services/developers/createDevelopers.services";
import { listDevelopersService } from "../services/developers/listDevelopers.services";
import { listDeveloperService } from "../services/developers/listDevelopers.services";
import { updateDeveloperService } from "../services/developers/updateDevelopers.services";
import { updateInfoService } from "../services/developers/updateInfo.services";
import { deleteDeveloperService } from "../services/developers/deleteDeveloper.services";

const createDevelopersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerData: DeveloperRequest = req.body;

  const newDeveloper: Developer = await createDevelopersService(developerData);

  return res.status(201).json(newDeveloper);
};

const listDevelopersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developers: Array<DevelopersWithInfo> = await listDevelopersService();

  return res.status(200).json(developers);
};

const listDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developer: Array<DevelopersWithInfo> = await listDeveloperService(
    req.params.id
  );

  return res.status(200).json(developer);
};

const updateDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const keys = res.locals.objUpdated;

  const developer = await updateDeveloperService(keys, req.params.id);

  return res.status(200).json(developer);
};

const updateInfoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const values = res.locals.objInfo;

  console.log("aqui vc chegou thiago");
  const info = await updateInfoService(values, req.params.id);

  return res.status(200).json(info);
};

const createDeveloperInfoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const value = res.locals.objInfo;

  const info = await updateInfoService(value, req.params.id);

  return res.status(200).json(info);
};

const deleteDeveloperController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteDeveloperService(req.params.id);

  return res.status(204).json();
};

export {
  createDevelopersController,
  listDevelopersController,
  listDeveloperController,
  updateDeveloperController,
  updateInfoController,
  deleteDeveloperController,
  createDeveloperInfoController,
};
