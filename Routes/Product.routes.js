import { Router } from "express";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";
import { addProduct, deleteProduct, filterProducts, getAllProducts, getSingleProduct, pageFilterProducts, sortingFilterProducts, updateProduct, yourProducts } from "../Controllers/Products.controllers.js";

const router = Router()
router.post("/add-product", checkUserId, addProduct)
router.get("/get-single-product", getSingleProduct)
router.get("/get-all-product", getAllProducts)
router.post("/your-products", yourProducts)
router.post("/update-product", updateProduct)
router.delete("/delete-product", deleteProduct)
router.post("/filter-products", filterProducts)
router.post("/filter-sorting", sortingFilterProducts)
router.post("/filter-page", pageFilterProducts)

export default router