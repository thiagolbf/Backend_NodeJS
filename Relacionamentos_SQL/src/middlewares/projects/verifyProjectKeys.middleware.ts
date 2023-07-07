import { Request, Response, NextFunction } from "express";

const verifyProjectsKeys = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const keys = Object.keys(req.body);
  let objProject: any = {};

  const newObj = (array: Array<string>, obj: any) => {
    for (let i = 0; i < array.length; i++) {
      if (
        array[i] === "name" ||
        array[i] === "description" ||
        array[i] === "estimatedTime" ||
        array[i] === "repository" ||
        array[i] === "startDate" ||
        array[i] === "endDate" ||
        array[i] === "developerId"
      ) {
        objProject[array[i]] = obj[array[i]];
      }
    }
  };
  newObj(keys, req.body);

  const objProjectKeys = Object.keys(objProject);

  if (req.method === "POST") {
    if (objProjectKeys.length < 6 || objProjectKeys.includes("endDate")) {
      return res.status(400).json({
        message: `Required keys are: name, description, estimatedTime, 
                  repository, startDate, developerId`,
      });
    }
    res.locals = { ...res.locals, objProject };
    next();
  } else {
    if (objProjectKeys.length === 0) {
      return res.status(400).json({
        message: "At least one of those keys must be send.",
        keys: [
          "name",
          "description",
          "estimatedTime",
          "repository",
          "startDate",
          "endDate",
          "developerId",
        ],
      });
    }
    res.locals = { ...res.locals, objProject };
    next();
  }
};

export { verifyProjectsKeys };
