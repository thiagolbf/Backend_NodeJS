import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorizationToken = req.headers.authorization;

  if (!authorizationToken) {
    throw new AppError("Missing beares token", 401);
  }

  const token = authorizationToken.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    res.locals = { ...res.locals, decoded };
  });

  return next();
};
