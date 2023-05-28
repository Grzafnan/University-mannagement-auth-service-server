import dotenv from 'dotenv' 
dotenv.config()
import mongoose from "mongoose";
import app from "./app";
const PORT: number = Number(process.env.PORT) || 8000;

async function run() {
 try {
  await mongoose.connect('mongodb://127.0.0.1:27017/university-management');
  console.log("Database connection established.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
 } catch (error:any) {
  console.log(error.message);
 }
};

//* Start the server
run();