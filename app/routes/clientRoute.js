import * as clientController from "../controllers/clientController.js";

import Router from "express";

export const clientRouter = Router();

clientRouter.patch("/:id", clientController.update);
clientRouter.get("/topBill", clientController.getTopBill);
