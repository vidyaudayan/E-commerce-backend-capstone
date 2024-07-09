import express from "express";
import  {createReview, getProductReviews, getReviewById,updateReview,deleteReview} from '../controllers/reviewController.js';
import authenticateUser from "../middlewares/user-middleware.js";
const reviewRouter = express.Router();

import cors from 'cors'
reviewRouter.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))


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
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],      
  };    
  reviewRouter.use(cors(corsOptions));*/

reviewRouter.use("/review",reviewRouter)
reviewRouter.post("/add-review",authenticateUser, createReview);
reviewRouter.get("/product/:product_id", getProductReviews);
reviewRouter.get('/:id', getReviewById);
reviewRouter.put('/update-review/:id', authenticateUser, updateReview);
reviewRouter.delete('/delete-review/:id', authenticateUser, deleteReview);

export default reviewRouter;  