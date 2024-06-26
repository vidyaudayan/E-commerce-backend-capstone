import express from "express";
import  {addToCart,getCart,updateCart, deleteFromCart} from '../controllers/cartController.js';
import authenticateUser from "../middlewares/user-middleware.js";
import { clearCartAfterPayment } from "../controllers/cartController.js";
const cartRouter = express.Router();
import cors from 'cors'
cartRouter.use("/cart",cartRouter)
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
    optionsSuccessStatus: 200 ,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],     
  };*/


  cartRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))

const corsOptions = {
  origin:  'https://imaginative-genie-54ec39.netlify.app' ,
  credentials: true, // Allow cookies for cross-origin requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods for CORS requests
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
  // ... other options if needed
};

cartRouter.use(cors(corsOptions));



cartRouter.post("/addtocart",authenticateUser, addToCart);
cartRouter.get('/', authenticateUser, getCart);
cartRouter.put('/update', authenticateUser, updateCart);
cartRouter.delete('/delete/:productId', authenticateUser, deleteFromCart);
cartRouter.post('/clear-cart', authenticateUser, clearCartAfterPayment);
export default cartRouter;    