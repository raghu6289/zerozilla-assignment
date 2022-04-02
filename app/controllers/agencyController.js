import * as agency from "../services/agencyService.js"; // Import from service folder

// Creating APi's

// Router -> Controller -> Service -> Repo

// 1. Add Agency

export const addAgency = async (req, res, next) => {
  try {
    const saveAgency = await agency.add(req.body);
    return res.status(200).send(saveAgency);
  } catch (err) {
    next(err)
  }
};
