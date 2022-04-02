import mongoose from "mongoose";

async function mongoSetup() {
  // mongoose.connect("mongodb+srv://raghu7795:Password%237795@cluster0.y7cad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  // });
  mongoose.connect("mongodb://localhost:27017/myapp", {
  });
}

export default mongoSetup;
