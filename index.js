import express from "express";
import router from "./Routes/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();
app.use(morgan('dev'))

// app.use((req, res, next) => {
//   console.log("hi from middleware use")
//   res.send("hi from middleware use")})

app.get("/", function (req, res) {
  res.send("Hello there!")
})

app.use("/api/v1", router)

mongoose.connect(process.env.MONGOURL).then(() => console.log("Database connected"))

app.listen(8000)
