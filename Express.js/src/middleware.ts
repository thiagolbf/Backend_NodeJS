import { NextFunction, Request, Response } from "express";

import { Data } from "./interfaces";

import { dataBase } from "./database";

//check body params. If they have right object keys and have the right data string(listName) and array(data)

const validateBodyKeys = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const bodyKeys: string[] = Object.keys(request.body);
  const requiredListKeys: string[] = ["listName", "data"];

  const validateListKeys = requiredListKeys.every((key: string) =>
    bodyKeys.includes(key)
  ); //

  //   const hasRequiredKeys = requiredListKeys.every((key) => {
  //     bodyKeys.includes(key);
  //     console.log(key);
  //   });

  if (!validateListKeys || (validateListKeys && bodyKeys.length > 2)) {
    const joinedKeys = requiredListKeys.join(", ");
    return response
      .status(400)
      .json({ message: `Invalid object keys. Expected ${joinedKeys}` });
  }

  if (
    typeof request.body.listName !== "string" ||
    Array.isArray(request.body.data) === false ||
    request.body.data.length === 0
  ) {
    return response.status(400).json({
      message: `listname must be string and data must be an array of objects`,
    });
  }

  const { listName, data } = request.body;

  request.validateBody = {
    listName,
    data,
  };

  next();
};

//check with Data is array of object, check keys from theses objects and if they are string

const validateDataContent = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const requiredDataKeys = ["name", "quantity"];

  // console.log(request.method);

  const validateDataKeys = request.validateBody.data.every((obj: Data) => {
    const actualKeys = Object.keys(obj);

    return requiredDataKeys.every((key) => actualKeys.includes(key));
  });

  if (!validateDataKeys) {
    return response
      .status(400)
      .json({ message: `Invalid array data - expected ${requiredDataKeys}` });
  }

  const validateDataContent = request.validateBody.data.every((obj: Data) => {
    const actualObj = Object.getOwnPropertyDescriptors(obj);

    if (
      typeof actualObj.name.value === "string" &&
      typeof actualObj.quantity.value === "string"
    ) {
      return true;
    }
  });

  if (validateDataKeys && !validateDataContent) {
    return response
      .status(400)
      .json({ message: `Invalid name or quantity input, even must be string` });
  }
  next();
};

//check if Id exist on List
const checkIdList = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = Number(request.params.id);

  // const id: number = Number(request.params);

  const idPosition = dataBase.findIndex((value) => {
    if (value.id === id) {
      return true;
    }
    return false;
  });

  if (idPosition === -1) {
    return response
      .status(404)
      .json({ message: `List with id ${id} does not exist` });
  }

  request.idIndexPosition = idPosition;

  next();
};

//Check if name exist on Data[{}]
const checkItemName = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const itemName: string = request.params.name;
  const list = dataBase[request.idIndexPosition];

  const namePosition = list.data.findIndex((value) => {
    return itemName === value.name;
  });

  if (namePosition === -1) {
    return response
      .status(404)
      .json({ message: `Item with name ${itemName} does not exist` });
  }

  request.namePosition = namePosition;

  next();
};

//check if one or both body keys are correct for data and if they have the right values;
const checkDataToUpdate = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const keys: string[] = Object.keys(request.body);
  const values: string[] = Object.values(request.body);

  const validateKeys = keys.every((value) => {
    if (value === "name" || value === "quantity") {
      return true;
    }
    return false;
  });

  const validateContent = values.every((value) => {
    if (typeof value === "string") {
      return true;
    }
    return false;
  });

  if (!validateKeys) {
    return response
      .status(400)
      .json({ message: `Key must be "name" and/or "quantity` });
  }

  if (!validateContent) {
    return response
      .status(400)
      .json({ message: `The list name and/or quantity must be a string` });
  }

  // request.dataUpdate = request.body;

  next();
};

export {
  validateBodyKeys,
  validateDataContent,
  checkIdList,
  checkItemName,
  checkDataToUpdate,
};
