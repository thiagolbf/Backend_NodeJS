import express from "express";
import { Application, json } from "express";

import {
  validateBodyKeys,
  validateDataContent,
  checkIdList,
  checkItemName,
  checkDataToUpdate,
} from "./middleware";
import {
  creatList,
  allList,
  filterListById,
  updateList,
  removeList,
  removeItemList,
} from "./logic";

const port: number = 3000;

const app: Application = express();
app.use(json());

app.post("/list", validateBodyKeys, validateDataContent, creatList);
app.get("/list", allList);
app.get("/list/:id", checkIdList, filterListById);

app.patch(
  "/list/:id/:name",
  checkIdList,
  checkItemName,
  checkDataToUpdate,
  updateList
);

app.delete("/list/:id", checkIdList, removeList);
app.delete("/list/:id/:name", checkIdList, checkItemName, removeItemList);

app.listen(port, () =>
  console.log(`Server runing on https://localhost:${port}`)
);
