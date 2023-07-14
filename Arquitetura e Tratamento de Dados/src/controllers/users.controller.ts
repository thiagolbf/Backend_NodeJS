import { Request, Response } from "express";

import { createUserService } from "../services/users/createUser.services";
import { listAllUsersService } from "../services/users/listAllUser.services";
import { profileService } from "../services/users/profileUser.services";
import { updateUserService } from "../services/users/updateUser.serives";
import { deleteUserService } from "../services/users/deleteUser.services";
import { recoverUserService } from "../services/users/recoverUser.services";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = await createUserService(req.body);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsers = await listAllUsersService();

  return res.status(200).json(allUsers);
};

const profileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const profile = await profileService(res.locals.decoded.sub);

  return res.status(200).json(profile);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedUser = await updateUserService(req.params.id, req.body);

  return res.status(200).json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(req.params.id);

  return res.status(204).json();
};

const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const recoveredUser = await recoverUserService(req.params.id);

  return res.status(200).json(recoveredUser);
};

export {
  createUserController,
  listAllUsersController,
  profileController,
  updateUserController,
  deleteUserController,
  recoverUserController,
};
