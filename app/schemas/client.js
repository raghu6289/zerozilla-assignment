import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const clientSchema = mongoose.model(
  "client",
  new mongoose.Schema({
    clientId: {
      type: String,
      required: true,
      unique: true,
      default:() => uuidv4()
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
