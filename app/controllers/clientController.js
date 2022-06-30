import * as clientService from "../services/clientService.js";

// Creating APi's

// Router -> Controller -> Service -> Repo

// 1. Update Client

export const update = async (req, res, next) => {
  try {
    const client = await clientService.update(req.params.id, req.body);
    return res.status(200).send(client);
  } catch (err) {

    next(err)
  }
};

// 2. Get Top Bill Agency

export const getTopBill = async (req, res, next) => {
  try {
    let data = await clientService.getTopBill();
    return res.status(200).send(data);
  } catch (err) {
    next(err)
  }
};
