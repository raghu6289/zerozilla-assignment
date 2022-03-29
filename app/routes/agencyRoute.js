import * as agencyController from "../controllers/agencyController.js";
import postAgencyValidation from "../validationSchema/postAgencyValidation.js";
import { createValidator } from 'express-joi-validation';

const validator = createValidator()

import Router from "express";

export const agencyrouter = Router();

agencyrouter.post("/",validator.body(postAgencyValidation), agencyController.addAgency);
