import { clientRouter } from "./clientRoute.js";
import { agencyrouter } from "./agencyRoute.js";

import Router from "express";

export const router = Router();

router.use("/client", clientRouter);
router.use("/agency", agencyrouter);
