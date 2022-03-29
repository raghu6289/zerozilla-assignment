import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const agencySchema = mongoose.model(
  "agency",
  new mongoose.Schema({
    agencyId: {
      type: String,
      required: true,
      unique: true,
      default:() => uuidv4()
    },
    name: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  })
);
export default agencySchema;
