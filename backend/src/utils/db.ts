import mongoose from "mongoose";
import sanitizedConfig from "../config/config";

async function connnectMongo() {
  try {
    await mongoose.connect(sanitizedConfig.MONGO_URI);
    console.log("connect to mongo");
  } catch (e: any) {
    console.log(e.message);
    setTimeout(connnectMongo, 5000);
  }
}

export default connnectMongo;
