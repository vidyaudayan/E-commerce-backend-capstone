import express from "express";
import  {getAllProducts, addProduct, getOneProductById } from '../controllers/productController.js';
import upload from "../middlewares/uploadMiddleware.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
const productRouter = express.Router();
import cors from 'cors'
const corsOptions = {
    origin: 'http://localhost:5174', // Allow only your frontend's origin
    credentials: true,               // Allow credentials (cookies, etc.)
    optionsSuccessStatus: 200        // For legacy browser support
  };

  productRouter.use(cors(corsOptions));

productRouter.use("/products",productRouter)


productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getOneProductById);
productRouter.post("/addproduct",authenticateAdmin, upload.single("productImage"), addProduct);

export default productRouter;