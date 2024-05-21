import express from "express";
import  {signup,signin, getProfile,getUserReviews } from '../controllers/userController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const userRouter = express.Router();
userRouter.use("/user",userRouter)

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/profile",authenticateUser, getProfile);
userRouter.get('/reviews/:id', authenticateUser, getUserReviews);

export default userRouter;