import mongoose from "mongoose";

const clientSchema = mongoose.model(
  "client",
  new mongoose.Schema({
    clientId: {
      type: String,
      required: true,
      unique: true,
    },
    agencyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    totalBill: {
      type: Number,
      required: true,
    },
  })
);

export default clientSchema;
