import client from "../schemas/client.js";
export const add = async (data) => {
  return await client.create(data);
};

export const update = async (id, attrs) => {
  return await client.findOneAndUpdate({ clientId: id }, attrs, { new: true });
};

export const findTopBill = async () => {
  return await client.aggregate([
    {
      $sort: {
        totalBill: -1,
      },
    },
    { $limit: 1 },
    {
      $lookup: {
        from: "agencies",
        localField: "agencyId",
        foreignField: "agencyId",
        as: "agency",
      },
    },
    {
      $unwind: {
        path: "$agency",
      },
    },
    {
      $project: {
        clientName: "$name",
        totalBill: "$totalBill",
        agencyName: "$agency.name",
      },
    },
  ]);
};
