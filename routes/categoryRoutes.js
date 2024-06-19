import express from "express";
import  {getCategories, getCategoryById, getCategoryWiseAllProducts, getCategoryWiseProduct } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

import cors from 'cors'
/*const corsOptions = {
    origin: 'http://localhost:5174', 
    origin: 'http://localhost:5173',
    credentials: true,               
    optionsSuccessStatus: 200      
  };*/
   
  const allowedOrigins = [process.env.FRONT_END_URL2, process.env.FRONT_END_URL1];

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

  categoryRouter.use(cors(corsOptions));

categoryRouter.use("/categories",categoryRouter)

categoryRouter.get("/", getCategories);
categoryRouter.get("/get-category/:id", getCategoryById);

  categoryRouter.get("/products-categorywise", getCategoryWiseProduct)

categoryRouter.post("/category-products", getCategoryWiseAllProducts)
  export default categoryRouter;  

    