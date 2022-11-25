import mongoose from "mongoose";
import {mongodb} from "./keys"
export async function connectDB() {
    await mongoose.connect(mongodb.URI)
    console.log("connect db")   
}
connectDB()
