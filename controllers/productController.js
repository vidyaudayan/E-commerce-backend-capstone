import Product from "../Model/productModel.js";

export const getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();
   res.send(products).res.status(200).json(products);
  } catch (error) {
    res.status(500).send("error occured");
  }
};

const getProductBySlug = async (req, res, next) => {
  res.send("Not written");
};

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Please check data");
  }
};

const updateProduct = async (req, res, next) => {
  res.send("Not written");
};

const deleteProduct = async (req, res, next) => {
  res.send("Not written");
};

