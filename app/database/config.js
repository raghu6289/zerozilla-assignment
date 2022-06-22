import mongoose from "mongoose";

// Mongodb connection
async function mongoSetup() {
    mongoose.connect("mongodb://localhost:27017/zerozilladb",
  // mongoose.connect("mongodb+srv://raghu7795:Password%237795@cluster0.y7cad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    {
  });
}

export default mongoSetup;
