import { errorCodes } from "../middleware/globalErrorHandler.js";
import * as clientRepo from "../repositories/clientRepo.js";

export const add = async (data) => {
  return await clientRepo.add(data);
};

export const update = async (id, attrs) => {
  const updatedClient = await clientRepo.update(id, attrs);
  console.log(id, updatedClient)
  if (!updatedClient) {
    throw { code: errorCodes.notFound }
  }
  return updatedClient;
};

export const getTopBill = async () => {
  return await clientRepo.findTopBill();
};
