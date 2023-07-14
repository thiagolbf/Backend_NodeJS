import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const verifyUserPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId = req.params.id;
  const { sub, admin } = res.locals.decoded;

  if (admin) return next();

  if (userId !== sub) {
    throw new AppError("Insufficient permissions", 403);
  }

  return next();
};
