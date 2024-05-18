import express from "express";
import  {getAllProducts, addProduct } from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.use("/products",productRouter)

productRouter.get("/", getAllProducts);
productRouter.post("/addproduct", addProduct);

export default productRouter;