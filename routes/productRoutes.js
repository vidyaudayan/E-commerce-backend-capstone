import express from "express";
import  {getAllProducts, addProduct } from '../controllers/productController.js';
import upload from "../middlewares/uploadMiddleware.js";
const productRouter = express.Router();
productRouter.use("/products",productRouter)

productRouter.get("/", getAllProducts);
productRouter.post("/addproduct",upload.single("image"), addProduct);

export default productRouter;