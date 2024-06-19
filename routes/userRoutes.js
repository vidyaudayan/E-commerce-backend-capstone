import express from "express";
import  {signup,signin, getProfile,getUserReviews,logout, forgotPassword, resetPassword} from '../controllers/userController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const userRouter = express.Router();

import cors from 'cors'
/*userRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))*/
userRouter.use(express.json());
const corsOptions = {
  origin:  'https://imaginative-genie-54ec39.netlify.app' ,
  credentials: true, // Allow cookies for cross-origin requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods for CORS requests
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
  // ... other options if needed
};

userRouter.use(cors(corsOptions));


userRouter.use("/user",userRouter)

userRouter.post("/signup", signup);
userRouter.post("/signin",authenticateUser, signin);
userRouter.get("/profile",authenticateUser, getProfile);
userRouter.get('/reviews/:id', authenticateUser, getUserReviews);
userRouter.post("/logout",logout);
userRouter.post('/forgot-password',authenticateUser, forgotPassword)
userRouter.post('/reset-password',resetPassword)
export default userRouter;