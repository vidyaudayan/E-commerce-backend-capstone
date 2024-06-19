import express from "express";
import  {getAllProducts, addProduct, getOneProductById, searchProducts } from '../controllers/productController.js';
import upload from "../middlewares/uploadMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
const productRouter = express.Router();
import cors from 'cors'
const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173'];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,   
    optionsSuccessStatus: 200    
  }; 
    

  productRouter.use(cors(corsOptions));

productRouter.use("/products",productRouter)
  

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getOneProductById);
//productRouter.get("/search",searchProducts)
//productRouter.post("/addproduct",authenticateAdmin, upload.single("productImage"), addProduct);

export default productRouter;   