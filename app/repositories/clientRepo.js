import client from "../schemas/client.js";
export const bulkCreate = async (clients) => {
  return await client.insertMany(clients);
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
        agencyName: "$agency.name",
        clientName: "$name",
        totalBill: "$totalBill",
      },
    },
  ]);
};
