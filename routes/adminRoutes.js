import express from "express";
import {
getAllProducts,addProduct
} from "../controllers/productController.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  getAllAdmins,
  singin,
  singup,
  deleteAdmin
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/signup", singup);
adminRouter.post("/signin", singin);

adminRouter.get("/get-products", getAllProducts);
adminRouter.get("/get-admins", getAllAdmins);

adminRouter.post("/add-products", upload.single("image"), addProduct);

//adminRouter.put("/update-courses/:id", updateCourse);

adminRouter.delete("/delete-admins/:id", deleteAdmin);

export default adminRouter;