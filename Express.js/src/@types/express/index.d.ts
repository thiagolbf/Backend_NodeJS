import * as express from "express";

import { Data } from "../../interfaces";

declare global {
  namespace Express {
    interface Request {
      validateBody: {
        listName: string;
        data: Data[];
      };
      idIndexPosition: number;
      namePosition: number;
      dataUpdate: Data;
    }
  }
}
