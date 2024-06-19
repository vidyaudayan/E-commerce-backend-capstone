
import express from "express";
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
const app = express();

app.use(express.json());

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
const corsOptions = {
  origin: process.env.FRONT_END_URL1, // Replace with your frontend's URL
  credentials: true, 
  optionsSuccessStatus: 200               // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));


app.use(cors({
  origin:process.env.FRONT_END_URL1,
  credentials:true
})) 
const port = process.env.PORT;
connectDb();

app.listen(port, () => {
  console.log(` Listening on port ${port}`);
});