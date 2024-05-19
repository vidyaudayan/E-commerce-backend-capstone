
import express from "express";
import cors from "cors"
import connectDb from "../config/db.js"
import cookieParser from "cookie-parser";
import userRouter from "../routes/userRoutes.js";
import productRouter from "../routes/productRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/admin',adminRouter)

const port = 3000;
connectDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});