import { Router } from "express";
import { addToCart, cart, deleteToCart } from "../Controllers/User.controllers.js";

const router = Router()

router.post("/add-cart", addToCart)
router.post("/delete-cart", deleteToCart)
router.post("/cart", cart)

export default router;