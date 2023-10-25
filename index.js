import express from "express";
import router from "./Routes/index.js";

const app = express();

app.use((req, res, next) => {
  console.log("hi from middleware use")
  res.send("hi from middleware use")})

app.get("/", function (req, res) {
  res.send("Hello there!")
})

app.use("/api/v1", router)

app.listen(8000)
