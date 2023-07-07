import { NextFunction, Request, Response } from "express";

const verifyDevelopersKeys = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const keys = Object.keys(req.body).splice(0, 2);

  let keysToUpdate: Array<string> = [];

  const verify = (currentValue: string) => {
    if (currentValue === "email" || currentValue === "name") {
      keysToUpdate.push(currentValue);

      return true;
    }
  };
  const checkKeys = keys.some(verify);

  if (req.method === "POST") {
    if (!checkKeys || keys.length < 2) {
      return res.status(400).json({
        message: "Required keys are: name, email. Must be with this order!",
      });
    }

    next();
  } else {
    const keysBody = Object.keys(req.body);
    let objUpdate: any = {};

    const newObj = (array: Array<string>, obj: any) => {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === "name" || array[i] === "email") {
          objUpdate[array[i]] = obj[array[i]];
        }
      }

      return objUpdate;
    };

    const objUpdated = newObj(keysBody, req.body);
    const objUpdatedKeys = Object.keys(objUpdate);

    if (objUpdatedKeys.length === 0) {
      return res.status(400).json({
        message: "At least one of those keys must be send: 'name', 'email'",
      });
    }

    res.locals = { ...res.locals, objUpdated };
    next();
  }
};

export { verifyDevelopersKeys };
