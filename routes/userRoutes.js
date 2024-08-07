import express from "express";
import  {signup,signin, getProfile,getUserReviews,logout, forgotPassword, resetPassword,getUserOrders} from '../controllers/userController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const userRouter = express.Router();
userRouter.use("/user",userRouter)
import cors from 'cors'
/*userRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))

userRouter.use(cors({
  origin: 'https://singular-axolotl-e26885.netlify.app' ,
  credentials: true,    
}))*/
userRouter.use(express.json());
/*const corsOptions = {
  origin:  'https://imaginative-genie-54ec39.netlify.app' ,
  credentials: true, // Allow cookies for cross-origin requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods for CORS requests
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
  // ... other options if needed
};*/


const allowedOrigins =['https://singular-axolotl-e26885.netlify.app', 'https://imaginative-genie-54ec39.netlify.app'];

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
  };    
    

userRouter.use(cors(corsOptions));




userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/profile",authenticateUser, getProfile);
userRouter.get('/reviews', authenticateUser, getUserReviews);
userRouter.get('/orders',authenticateUser, getUserOrders)
userRouter.post("/logout",logout);
userRouter.post('/forgot-password',authenticateUser, forgotPassword)
userRouter.post('/reset-password',resetPassword)
export default userRouter;