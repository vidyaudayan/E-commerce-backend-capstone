import express from "express";
import  {createCheckout, createPayment, getPaymentById} from '../controllers/paymentController.js';
import authenticateUser from "../middlewares/user-middleware.js";
import cors from 'cors'

const Router = express.Router();
const paymentRouter = express.Router();
paymentRouter.use("/payment",paymentRouter)
paymentRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))


/*const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

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
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']     
  };    
  paymentRouter.use(cors(corsOptions));*/


paymentRouter.post("/",authenticateUser, createPayment);
paymentRouter.get("/:paymentId",authenticateUser, getPaymentById);
paymentRouter.post("/checkout",authenticateUser, createCheckout);

export default paymentRouter;