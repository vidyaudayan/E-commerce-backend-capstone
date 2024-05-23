import express from "express";
import  {sellerSignup,sellerSignin, updateSeller} from '../controllers/sellerController.js';
import authenticateSeller from "../middlewares/sellerMiddleware.js";
const sellerRouter = express.Router();

sellerRouter.use("/seller",sellerRouter)

sellerRouter.post("/signup", sellerSignup);
sellerRouter.post("/signin", sellerSignin);
sellerRouter.put("/update/:sellerId",authenticateSeller, updateSeller);

export default sellerRouter;