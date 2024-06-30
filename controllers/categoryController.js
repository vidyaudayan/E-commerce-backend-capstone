
import Category from '../Model/categoryModel.js';
import Product from '../Model/productModel.js';
import mongoose from 'mongoose';
// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { title, description,slug,thumbnail,products } = req.body;

    const newCategory = new Category({
      title,
      description,slug,thumbnail,products 
    });

    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};


// Get products categorywise

export const getCategoryWiseProduct = async(req,res)=>{
  try{
    const productCategory = await Product.distinct("category")
         
        console.log("category", productCategory)

        
        const productByCategory = []

        for(const category of productCategory){
            const product = await Product.findOne({category:category })

            if(product){
                productByCategory.push(product)
            }
        }  
        res.json({
            message : "category product",
            data : productByCategory,
            success : true,
            error : false
        })
     
  }catch(error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
}


export const getCategoryWiseAllProducts = async(req,res)=>{
  try{
  
    const { category } = req.body;

    
    if (mongoose.Types.ObjectId.isValid(category)) {
      const categoryId = new mongoose.Types.ObjectId(category);
      const products = await Product.find({ category: categoryId });
      res.json({
        message: "products",
        data: products,
        success: true,
        error: false
      });
    } else {
      res.status(400).json({
        message: "Invalid category ID",
        success: false,
        error: true
      });
    }
     
  }catch(error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
}



// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found.');
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const {title, description,slug,thumbnail,products } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title, description,slug,thumbnail,products },
      { new: true } 
    );

    if (!updatedCategory) {
      return res.status(404).send('Category not found');
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).send('Category not found');
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// get Category and slug wise all products

export const getCategorySlugWiseAllProducts = async (req, res) => {
  try {
    const { category, slug } = req.body;

    let query = {};
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      query.category = new mongoose.Types.ObjectId(category);
    }
    if (slug) {
      query.slug = slug;
    }  

    const products = await Product.find(query);
    res.json({
      message: "products",
      data: products,
      success: true,
      error: false
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};