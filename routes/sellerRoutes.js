import express from "express";
import  {sellerSignup,sellerSignin} from '../controllers/sellerController.js';
//import authenticateUser from "../middlewares/seller-middleware.js";
const sellerRouter = express.Router();

sellerRouter.use("/seller",sellerRouter)
sellerRouter.post("/signup", sellerSignup);
sellerRouter.post("/signin", sellerSignin);


export default sellerRouter;