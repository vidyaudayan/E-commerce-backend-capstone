import express from "express";
import  {signup,signin, getProfile,getUserReviews,logout, forgotPassword, resetPassword} from '../controllers/userController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const userRouter = express.Router();
import cors from 'cors'
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only your frontend's origin
    credentials: true,               // Allow credentials (cookies, etc.)
    optionsSuccessStatus: 200        // For legacy browser support
  };

  userRouter.use(cors(corsOptions));
userRouter.use(express.json());

// Define a preflight response for all routes
userRouter.options('*', cors(corsOptions));

userRouter.use("/user",userRouter)

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/profile",authenticateUser, getProfile);
userRouter.get('/reviews/:id', authenticateUser, getUserReviews);
userRouter.post("/logout",logout);
userRouter.post('/forgot-password',authenticateUser, forgotPassword)
userRouter.post('/reset-password',resetPassword)
export default userRouter;