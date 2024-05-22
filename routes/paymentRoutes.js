import express from "express";
import  {createPayment, getPaymentById} from '../controllers/paymentController.js';
import authenticateUser from "../middlewares/user-middleware.js";

const Router = express.Router();
const paymentRouter = express.Router();

paymentRouter.use("/payment",paymentRouter)
paymentRouter.post("/",authenticateUser, createPayment);
paymentRouter.get("/:paymentId",authenticateUser, getPaymentById);

export default paymentRouter;