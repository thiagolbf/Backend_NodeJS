import { Request, Response } from "express";

import { createUserService } from "../services/users/createUser.services";
import { listAllUsersService } from "../services/users/listAllUser.services";

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

export { createUserController, listAllUsersController };
