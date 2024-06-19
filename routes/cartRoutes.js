import express from "express";
import  {addToCart,getCart,updateCart, deleteFromCart} from '../controllers/cartController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const cartRouter = express.Router();
import cors from 'cors'
cartRouter.use("/cart",cartRouter)
//const allowedOrigins = [process.env.FRONT_END_URL2, process.env.FRONT_END_URL1];

  /*const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,   
    optionsSuccessStatus: 200      
  };    

  cartRouter.use(cors(corsOptions));*/
  /*cartRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))*/

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

export default cartRouter;  