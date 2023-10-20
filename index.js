import express from "express";
import { Hello } from "./Controllers/Controller.js";

const app = express();

app.get("/", function (req, res) {
 res.send("Welcome")
})

app.get("/controller", Hello)

app.listen(8000)
