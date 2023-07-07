import { NextFunction, Request, Response } from "express";

const verifyInfoKeys = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const keysBody = Object.keys(req.body);
  let objUpdate: any = {};

  const newObj = (array: Array<string>, obj: any) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "developerSince" || array[i] === "preferredOS") {
        objUpdate[array[i]] = obj[array[i]];
      }
    }

    return objUpdate;
  };

  const objInfo = newObj(keysBody, req.body);
  const objInfoUpdatedKeys = Object.keys(objUpdate);
  const objInfoUpdateValues = Object.values(objUpdate);

  const checkOs = objInfoUpdateValues.some((value) => {
    if (value === "Windows" || value === "Linux" || value === "MacOs") {
      return true;
    }
  });

  const checkDeveloperSince = objInfoUpdatedKeys.some((value) => {
    if (value === "developerSince") {
      return true;
    }
  });

  if (req.method === "PATCH") {
    console.log("AE");
    console.log(checkOs);
    console.log(checkDeveloperSince);
    if (objInfoUpdatedKeys.length === 0) {
      return res.status(400).json({
        message: "At least one of those keys must be send.",
        keys: ["developerSince", "preferredOS"],
      });
    }

    if (checkOs || checkDeveloperSince) {
      res.locals = { ...res.locals, objInfo };
      next();
    } else {
      return res.status(400).json({
        message: "Invalid OS option.",
        options: ["Windows", "Linux", "MacOs"],
      });
    }
  }

  if (req.method === "POST") {
    if (checkOs) {
      res.locals = { ...res.locals, objInfo };
      next();
    } else {
      return res.status(400).json({
        message: "Invalid OS option.",
        options: ["Windows", "Linux", "MacOS"],
      });
    }

    if (objInfoUpdatedKeys.length < 2) {
      return res.status(400).json({
        message: "Missing required keys: developerSince,preferredOS.",
      });
    }
  }
};

export { verifyInfoKeys };
