import { Router } from "express";
import { AddToCart } from "../Controllers/User.controllers.js";

const router = Router()

router.post("/add-cart", AddToCart)

export default router;