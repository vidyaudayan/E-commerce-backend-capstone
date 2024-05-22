import express from "express";
import  {getCategories, getCategoryById } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.use("/categories",categoryRouter)
categoryRouter.get("/", getCategories);
categoryRouter.get("/get-category/:id", getCategoryById);

export default categoryRouter;