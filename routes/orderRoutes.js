import express from "express";
import  {createOrder, getOrderById, getUserOrders} from '../controllers/orderController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const orderRouter = express.Router();
import cors from 'cors'
orderRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))
orderRouter.use("/order",orderRouter);
orderRouter.post("/",authenticateUser, createOrder);
orderRouter.get("/",authenticateUser, getUserOrders);
orderRouter.get("/:orderId",authenticateUser, getOrderById);


export default orderRouter;