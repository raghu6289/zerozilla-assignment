import mongoose from "mongoose";

async function mongoSetup() {
  mongoose.connect("mongodb://localhost:27017/zerozilla", {
    // useNewUrlParser: true,
    // useCreateIndex: true,
  });
}

export default mongoSetup;
