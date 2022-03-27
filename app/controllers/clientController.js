import * as clientService from "../services/clientService.js";

// Creating APi's

// Repository -> Service -> Controller -> Router

// 1. Update Client

export const update = async (req, res) => {
  const client = await clientService.update(req.params.id, req.body);
  return res.status(200).send(client);
};

// 2. Get Top Bill Agency

export const getTopBill = async (req, res) => {
  let data = await clientService.getTopBill();
  return res.status(200).send(data);
};
