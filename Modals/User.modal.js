import mongoose, { Schema } from "mongoose";

const user = new Schema({
   name: String,
   email: String,
   password: String,
   phone: Number
})

export default mongoose.model("User", user);