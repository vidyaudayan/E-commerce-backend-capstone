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
  updateOrderStatus
} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/adminController.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import { createCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";

const adminRouter = express.Router();

adminRouter.post("/signup", singup);
adminRouter.post("/signin", singin);
adminRouter.get("/get-admins",authenticateAdmin, getAllAdmins);
adminRouter.delete("/delete-admins/:id", deleteAdmin);

adminRouter.get("/get-users",authenticateAdmin, getAllUsers);
adminRouter.get("/get-user/:userId",authenticateAdmin, getOneUserById);
adminRouter.put("/update-users/:id",authenticateAdmin, updateUser);
adminRouter.delete("/delete-user/:id",authenticateAdmin, deleteUser);


adminRouter.get("/get-products", getAllProducts);
adminRouter.post("/add-products",authenticateAdmin, upload.single("image"), addProduct);
adminRouter.put("/update-product/:id",authenticateAdmin, updateProduct);
adminRouter.delete("/delete-product/:id",authenticateAdmin, deleteProduct);


adminRouter.post("/add-category",authenticateAdmin, createCategory);
adminRouter.put("/update-category/:id",authenticateAdmin, updateCategory);
adminRouter.delete("/delete-category/:id",authenticateAdmin, deleteCategory);

adminRouter.put("/update-order/:orderId",authenticateAdmin, updateOrderStatus);

export default adminRouter;