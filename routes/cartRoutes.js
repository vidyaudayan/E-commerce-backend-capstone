import express from "express";
import  {addToCart,getCart,updateCart, deleteFromCart} from '../controllers/cartController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const cartRouter = express.Router();
cartRouter.use("/cart",cartRouter)

cartRouter.post("/add",authenticateUser, addToCart);
cartRouter.get('/', authenticateUser, getCart);
cartRouter.put('/update', authenticateUser, updateCart);
cartRouter.delete('/delete/:productId', authenticateUser, deleteFromCart);

export default cartRouter;