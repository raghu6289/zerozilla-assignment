import * as agencyRepo from "../repositories/agencyRepo.js";
import * as clientRepo from "../repositories/clientRepo.js";


export const add = async (data) => {
  const agency = (await agencyRepo.add(data)).toObject();
  agency.client = await clientRepo.bulkCreate(data.clients.map(c => ({ ...c, agencyId: agency.agencyId })));
  return agency;
};

