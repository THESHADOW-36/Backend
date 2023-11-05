import { Router } from "express";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";
import { addProduct, filterProducts, getAllProducts, getSingleProduct } from "../Controllers/Products.controllers.js";

const router = Router()
router.post("/filter-products",filterProducts)
router.post("/add-product", checkUserId, addProduct)
router.post("/get-single-product", getSingleProduct)
router.get("/get-all-product", getAllProducts)

export default router