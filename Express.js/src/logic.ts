import { Request, Response } from "express";

import { dataBase, id } from "./database";
import { ListWithId } from "./interfaces";

const creatList = (request: Request, response: Response): Response => {
  let newId = dataBase.length + 1;

  const checkId = dataBase.some((value) => value.id === newId);

  if (checkId) {
    for (let i = 1; i < dataBase.length + 1; i++) {
      const check = dataBase.some((value) => value.id === i);

      if (!check) {
        newId = i;
        break;
      }
    }
  }

  const newList: ListWithId = {
    id: newId,
    ...request.validateBody,
  };

  id.push(newId);
  dataBase.push(newList);

  return response.status(201).json(newList);
};

const allList = (request: Request, response: Response): Response => {
  dataBase.sort(function (a, b) {
    return a.id - b.id;
  });

  return response.status(200).json(dataBase);
};

const filterListById = (request: Request, response: Response): Response => {
  return response.status(200).json(dataBase[request.idIndexPosition]);
};

const updateList = (request: Request, response: Response): Response => {
  dataBase[request.idIndexPosition].data[request.namePosition] = {
    ...dataBase[request.idIndexPosition].data[request.namePosition],
    ...request.body,
  };

  return response
    .status(200)
    .json(dataBase[request.idIndexPosition].data[request.namePosition]);
};

const removeList = (request: Request, response: Response): Response => {
  dataBase.splice(request.idIndexPosition, 1);

  return response.status(204).json({});
};

const removeItemList = (request: Request, response: Response): Response => {
  dataBase[request.idIndexPosition].data.splice(request.namePosition, 1);

  return response.status(204).json({});
};

export {
  creatList,
  allList,
  filterListById,
  updateList,
  removeList,
  removeItemList,
};
