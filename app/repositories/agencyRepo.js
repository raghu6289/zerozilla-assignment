import agency from "../schemas/agency.js";

export const add = async (data) => {
  return await agency.create(data);
};

