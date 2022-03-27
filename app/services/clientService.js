import * as clientRepo from "../repositories/clientRepo.js";

export const add = async (data) => {
  return await clientRepo.add(data);
};

export const update = async (id, attrs) => {
  return await clientRepo.update(id, attrs);
};

export const getTopBill = async () => {
  return await clientRepo.findTopBill();
};
