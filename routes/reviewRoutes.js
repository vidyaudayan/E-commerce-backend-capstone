import express from "express";
import  {createReview, getProductReviews, getReviewById,updateReview,deleteReview} from '../controllers/reviewController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const reviewRouter = express.Router();

import cors from 'cors'
reviewRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))

reviewRouter.use("/review",reviewRouter)
reviewRouter.post("/add-review",authenticateUser, createReview);
reviewRouter.get("/product/:product_id", getProductReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.put('/update-review/:id', authenticateUser, updateReview);
reviewRouter.delete('/delete-review/:id', authenticateUser, deleteReview);

export default reviewRouter;