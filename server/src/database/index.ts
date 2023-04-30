import mongoose from "mongoose";

const dbUrl = process.env.MONGO_CONNECT_URL;

export const connectToDatabase = async () => {
  if (dbUrl) {
    await mongoose.connect(dbUrl);
    console.log("Connected to Database");
  } else {
    console.log("MONGO_CONNECT_URL not found");
  }
};

connectToDatabase().catch((e) => console.log(e));
