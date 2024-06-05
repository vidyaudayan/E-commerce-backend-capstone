import express from "express";
import {
getAllProducts,addProduct
} from "../controllers/productController.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  getAllAdmins,
  singin,
  singup,
  deleteAdmin,
  getOneUserById, updateUser,
  deleteUser, updateProduct,
  deleteProduct,
  updateOrderStatus,
  getAdminProfile
} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/adminController.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import { createCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";
import { getAllPayments, updatePaymentStatus } from "../controllers/adminController.js";
import authenticateUser from "../middlewares/user-middleware.js";
const adminRouter = express.Router();
import cors from 'cors'
const corsOptions = {
    origin: 'http://localhost:5174', // Allow only your frontend's origin
    credentials: true,               // Allow credentials (cookies, etc.)
    optionsSuccessStatus: 200        // For legacy browser support
  };

  adminRouter.use(cors(corsOptions));
adminRouter.use(express.json());

adminRouter.post("/signup", singup);
adminRouter.post("/signin", singin);
adminRouter.get("/adminprofile",authenticateAdmin, getAdminProfile )
adminRouter.get("/get-admins",authenticateAdmin, getAllAdmins);
adminRouter.delete("/delete-admins/:id", deleteAdmin);

adminRouter.get("/get-users", getAllUsers);
adminRouter.get("/get-user/:userId",authenticateAdmin, getOneUserById);
adminRouter.put("/update-users/:id",authenticateAdmin, updateUser);
adminRouter.delete("/delete-user/:id",authenticateAdmin, deleteUser);


adminRouter.get("/get-products", getAllProducts);
adminRouter.post("/add-products",authenticateAdmin, upload.single('productImage'), addProduct);
adminRouter.put("/update-product/:id",authenticateAdmin, updateProduct);
adminRouter.delete("/delete-product/:id",authenticateAdmin, deleteProduct);


adminRouter.post("/add-category",authenticateAdmin, createCategory);
adminRouter.put("/update-category/:id",authenticateAdmin, updateCategory);
adminRouter.delete("/delete-category/:id",authenticateAdmin, deleteCategory);

adminRouter.put("/update-order/:orderId",authenticateAdmin, updateOrderStatus);

adminRouter.get("/get-payments", authenticateUser, authenticateAdmin, getAllPayments);
adminRouter.put('/update-paymentstatus/:paymentId', authenticateUser, authenticateAdmin, updatePaymentStatus);

export default adminRouter;