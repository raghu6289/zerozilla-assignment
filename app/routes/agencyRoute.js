import * as agencyController from "../controllers/agencyController.js";

import Router from "express";

export const agencyrouter = Router();

agencyrouter.post("/", agencyController.addAgency);
