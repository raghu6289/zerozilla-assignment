import mongoose from "mongoose";
import "dotenv/config"

async function mongoSetup() {
  mongoose.connect(process.env.MONGO_CONN, (err) => {
    if (err) console.log("Database Failed to Connect")
    console.log("Database Connected Successfully...")
  });
}

export default mongoSetup;
