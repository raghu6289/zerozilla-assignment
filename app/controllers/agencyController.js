import * as agency from "../services/agencyService.js"; // Import from service folder

// Creating APi's

// Repository -> Service -> Controller -> Router

// 1. Add Agency

export const addAgency = async (req, res) => {
  const saveAgency = await agency.add(req.body);
  return res.status(200).send(saveAgency);
};
