
import express from "express";
import dotenv from "dotenv";

dotenv.config();

import expressSession from 'express-session'

const sessionConfig={
  secret: process.env.SE, // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production
};
const app = express();
app.use(expressSession(sessionConfig))
import cors from "cors"
import connectDb from "../config/db.js"
import cookieParser from "cookie-parser";
import userRouter from "../routes/userRoutes.js";
import productRouter from "../routes/productRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import categoryRouter from "../routes/categoryRoutes.js";
import reviewRouter from "../routes/reviewRoutes.js";
import cartRouter from "../routes/cartRoutes.js";
import orderRouter from "../routes/orderRoutes.js";
import paymentRouter from "../routes/paymentRoutes.js";
import sellerRouter from "../routes/sellerRoutes.js";


app.use(express.json());

app.use(cors({
    origin: 'https://imaginative-genie-54ec39.netlify.app' ,
    credentials: true,    
}))
app.use(cookieParser())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/categories',categoryRouter)
app.use('/api/v1/review',reviewRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/payment',paymentRouter)
app.use('/api/v1/seller',sellerRouter)





 
const port = process.env.PORT;
connectDb();

app.listen(port, () => {
  console.log(` Listening on port ${port}`);
});