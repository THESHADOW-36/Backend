import express from "express";
import router from "./Routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors"


const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  console.log("hi from middleware use")
  next();
})

app.get("/",(req,res)=>{
  res.send("Welcom to Backend Server")
})

app.use("/api/v1", router)

mongoose.connect(process.env.MONGOURL).then(() => console.log("Database connected"))

app.listen(8000, () => console.log("Server is running on port 8000."))
