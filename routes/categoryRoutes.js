import express from "express";
import  {getCategories, getCategoryById } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

import cors from 'cors'
const corsOptions = {
    origin: 'http://localhost:5174', 
    credentials: true,               
    optionsSuccessStatus: 200      
  };

  categoryRouter.use(cors(corsOptions));

categoryRouter.use("/categories",categoryRouter)
categoryRouter.get("/", getCategories);
categoryRouter.get("/get-category/:id", getCategoryById);

export default categoryRouter;