import express from "express";
import  {createPayment, getPaymentById} from '../controllers/paymentController.js';
import authenticateUser from "../middlewares/user-middleware.js";
import cors from 'cors'

const Router = express.Router();
const paymentRouter = express.Router();

paymentRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))

paymentRouter.use("/payment",paymentRouter)
paymentRouter.post("/",authenticateUser, createPayment);
paymentRouter.get("/:paymentId",authenticateUser, getPaymentById);

export default paymentRouter;