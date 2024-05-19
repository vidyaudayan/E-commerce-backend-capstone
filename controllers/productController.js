import Product from "../Model/productModel.js";
import Admin from "../Model/adminModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send("error occured");
  }
};

const getProductBySlug = async (req, res, next) => {
  res.send("Not written");
};

export const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      console.log(result);

      const imageUrl = result.url;

      const body = req.body;

      console.log(body, "body");

      const { title, description, price, adminEmail } = body;

      const findAdmin = await Admin.find({ email: adminEmail });

      if (!findAdmin) {
        return res.send("please add admin first").status(201);
      }

      const createProduct = new Product({
        title,
        description,
        price,
        admin: findAdmin._id,
        image: imageUrl,
      });

      const newProductCreated = await createProduct.save();

      if (!newProductCreated) {
        return res.send("product is not created");
      }
      return res.send(newProductCreated);
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.send("failed to create product").status(201);
  }
};

/*export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Please check data");
  }
};*/

const updateProduct = async (req, res, next) => {
  res.send("Not written");
};

const deleteProduct = async (req, res, next) => {
  res.send("Not written");
};

