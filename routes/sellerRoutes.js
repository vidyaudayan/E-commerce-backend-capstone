import express from "express";
import  {sellerSignup,sellerSignin, updateSeller} from '../controllers/sellerController.js';
import authenticateSeller from "../middlewares/sellerMiddleware.js";
const sellerRouter = express.Router();

import cors from 'cors'
/*sellerRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))*/

sellerRouter.use("/seller",sellerRouter)

sellerRouter.post("/signup", sellerSignup);
sellerRouter.post("/signin", sellerSignin);
sellerRouter.put("/update/:sellerId",authenticateSeller, updateSeller);

export default sellerRouter;