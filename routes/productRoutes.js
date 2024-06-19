import express from "express";
import  {getAllProducts, addProduct, getOneProductById, searchProducts } from '../controllers/productController.js';
import upload from "../middlewares/uploadMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
const productRouter = express.Router();
import cors from 'cors'


productRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))   

  

productRouter.use("/products",productRouter)
  

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getOneProductById);
//productRouter.get("/search",searchProducts)
//productRouter.post("/addproduct",authenticateAdmin, upload.single("productImage"), addProduct);

export default productRouter;   