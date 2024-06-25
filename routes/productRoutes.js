import express from "express";
import  {getAllProducts, addProduct, getOneProductById, searchProducts, filter } from '../controllers/productController.js';
import upload from "../middlewares/uploadMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
const productRouter = express.Router();
import cors from 'cors'


productRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))  


    /*const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

    const corsOptions = {
      origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,   
      optionsSuccessStatus: 200,
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],      
    };    
    productRouter.use(cors(corsOptions));  */

productRouter.use("/products",productRouter)
  

productRouter.get("/", getAllProducts);

productRouter.get("/search",searchProducts)
productRouter.post("/filter",filter)

//productRouter.post("/addproduct",authenticateAdmin, upload.single("productImage"), addProduct);
productRouter.get("/:productId", getOneProductById); 
export default productRouter;       