import mongoose from "mongoose";
import "dotenv/config"

// Mongodb connection
async function mongoSetup() {
  mongoose.connect(process.env.CONN, (err) => {
    if (err) console.log("DB Failed to Connect");
    console.log("DB Connected Successfully");
    }
  // mongoose.connect("mongodb+srv://raghu7795:Password%237795@cluster0.y7cad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  );
}

export default mongoSetup;
