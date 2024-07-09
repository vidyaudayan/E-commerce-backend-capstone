import express from "express";
import  {createOrder, getOrderById, getUserOrders} from '../controllers/orderController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const orderRouter = express.Router();
import cors from 'cors'
orderRouter.use("/order",orderRouter);
orderRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))
orderRouter.use(cors({
  origin: 'https://singular-axolotl-e26885.netlify.app' ,
  credentials: true,    
}))

/*const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173'];

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
  orderRouter.use(cors(corsOptions));*/


orderRouter.post("/",authenticateUser, createOrder);
orderRouter.get("/",authenticateUser, getUserOrders);
orderRouter.get("/:orderId",authenticateUser, getOrderById);


export default orderRouter;