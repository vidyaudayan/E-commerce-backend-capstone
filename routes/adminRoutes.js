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
  deleteProduct
} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/adminController.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/signup", singup);
adminRouter.post("/signin", singin);

adminRouter.get("/get-products", getAllProducts);
adminRouter.get("/get-admins",authenticateAdmin, getAllAdmins);

adminRouter.post("/add-products",authenticateAdmin, upload.single("image"), addProduct);
adminRouter.get("/get-users",authenticateAdmin, getAllUsers);
adminRouter.get("/get-user/:userId",authenticateAdmin, getOneUserById);

adminRouter.put("/update-users/:id",authenticateAdmin, updateUser);
adminRouter.delete("/delete-user/:id",authenticateAdmin, deleteUser);
adminRouter.delete("/delete-admins/:id", deleteAdmin);

adminRouter.put("/update-product/:id",authenticateAdmin, updateProduct);
adminRouter.delete("/delete-product/:id",authenticateAdmin, deleteProduct);

export default adminRouter;