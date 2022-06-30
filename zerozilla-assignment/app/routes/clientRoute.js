import * as clientController from "../controllers/clientController.js";
import updateAgencyValidation from "../validationSchema/updateAgencyValidation.js";
import Router from "express";
import { createValidator } from 'express-joi-validation';

const validator = createValidator()

export const clientRouter = Router();

clientRouter.patch("/:id",validator.body(updateAgencyValidation),clientController.update);
clientRouter.get("/topBill", clientController.getTopBill);
