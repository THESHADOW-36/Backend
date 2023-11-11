import { Router } from "express";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";
import { addProduct, filterProducts, getAllProducts, getSingleProduct, pageFilterProducts, sortingFilterProducts } from "../Controllers/Products.controllers.js";

const router = Router()
router.post("/add-product", checkUserId, addProduct)
// router.post("/add-product", addProduct)
router.post("/get-single-product", getSingleProduct)
router.get("/get-all-product", getAllProducts)
router.post("/filter-products", filterProducts)
router.post("/filter-sorting", sortingFilterProducts)
router.post("/filter-page", pageFilterProducts)

export default router