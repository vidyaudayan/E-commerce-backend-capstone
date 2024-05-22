import express from "express";
import  {getAllProducts, addProduct, getOneProductById } from '../controllers/productController.js';
import upload from "../middlewares/uploadMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
const productRouter = express.Router();

productRouter.use("/products",productRouter)
productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getOneProductById);
productRouter.post("/addproduct",authenticateAdmin, upload.single("image"), addProduct);

export default productRouter;