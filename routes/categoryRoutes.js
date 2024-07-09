import express from "express";
import  {getCategories, getCategoryById, getCategoryWiseAllProducts, getCategoryWiseProduct, getCategorySlugWiseAllProducts } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

import cors from 'cors'
/*const corsOptions = {
    origin: 'http://localhost:5174', 
    origin: 'http://localhost:5173',
    credentials: true,               
    optionsSuccessStatus: 200      
  };*/
   
 /* const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173'];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,   
    optionsSuccessStatus: 200 ,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],  
  }; 

  categoryRouter.use(cors(corsOptions));*/

 categoryRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))

categoryRouter.use("/categories",categoryRouter)

categoryRouter.get("/", getCategories);
categoryRouter.post("/slug-products", getCategorySlugWiseAllProducts)
categoryRouter.get("/get-category/:id", getCategoryById);

  categoryRouter.get("/products-categorywise", getCategoryWiseProduct)

categoryRouter.post("/category-products", getCategoryWiseAllProducts)


export default categoryRouter;  

    