import mongoose from "mongoose";

async function mongoSetup() {
  mongoose.connect("mongodb+srv://raghu7795:Password%237795@cluster0.y7cad.mongodb.net/zeroZilla?retryWrites=true&w=majority", {
  });
}

export default mongoSetup;
