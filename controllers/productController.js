import Product from "../Model/productModel.js";
import Admin from "../Model/adminModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

// Get all products
export const getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send("error occured");
  }
};


// Get product by slug
const getProductBySlug = async (req, res, next) => {
  res.send("Not written");
};

//Add product
{/*export const addProduct = async (req, res) => {
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

      const body =JSON.parse(req.body.productDetails)

      console.log("body", body);

      const { title, description,slug, price,adminEmail,category, productPictures, reviews } = body;

      const findAdmin = await Admin.find({ email: adminEmail });

      if (!findAdmin) {
        return res.send("please add admin first").status(201);
      }

let parsedProductPictures = [];  
let parsedReviews = [];

try {
  if (productPictures) {
    parsedProductPictures = JSON.parse(productPictures);
  }
  if (reviews) {
    parsedReviews = JSON.parse(reviews);
  }
} catch (error) {
  return res.status(400).json({ success: false, message: "Invalid JSON format" });
}

      const createProduct = new Product({ 
        title,
        description,
        price,
        slug,
        admin: findAdmin._id,
        image: imageUrl,
        productPictures: parsedProductPictures,
        reviews: parsedReviews,
        category 
      });

      const newProductCreated = await createProduct.save();

      if (!newProductCreated) {
        return res.send("product is not created");
      }
      return res.status(201).send(newProductCreated).json({
        success: true,
        message: "Product created successfully",
      });
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).send("failed to create product")
  }
}


/*export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Please check data");
  }
};
*/}
 


export const addProduct = async (req, res) => {
  try {
      const { productDetails } = req.body;
      const body = JSON.parse(productDetails);
console.log(body)
      const imageUrls = [];

      // Upload each image to Cloudinary and collect URLs
      for (const file of req.files) {
          const result = await cloudinaryInstance.uploader.upload(file.path);
          imageUrls.push(result.url);
      }
console.log(imageUrls)
      const { title,category, description, slug, price, sellingPrice} = body;
console.log("body2", body)
    /* const findAdmin = await Admin.findOne({ email: adminEmail });

      if (!findAdmin) {
          return res.status(404).send("Admin not found");
      }*/

      const createProduct = new Product({
          title,   
          category,
          description,   
          price,   
          slug,
         sellingPrice,
          image: imageUrls[0], // Assuming the first image is the main image
          productPictures:imageUrls,
        
      });

      const newProductCreated = await createProduct.save();

      if (!newProductCreated) {
          return res.status(400).send("Product creation failed");
      }

      return res.status(201).json({
          success: true,
          message: "Product created successfully",
          product: newProductCreated,
      });
  } catch (error) {
      console.log("Error creating product:", error);
      res.status(500).send("Failed to create product");
  }
};

// Get single product
export const getOneProductById= async (req, res) => {
  try{
    const { productId } = req.params;
    //const  {id}  = req.params
    console.log("req.param", req.params)
    //console.log("Requested product ID:", id)
   const product = await Product.findById(productId).exec();
    
   if(!product){
     res.status(404).json({error:'product not found'})
    }
    res.json(product)  
    }catch(error){
     console.log(error)
     res.status(500).json({error:'internal error'})
    }
}  
            
   // Search products
  export const searchProducts= async(req,res)=>{
    try{

      const { search } = req.query;
      console.log("query", req.query)

      const params = new URLSearchParams(search);
      const searchTerm = params.get('q');

      console.log("Extracted search term:", searchTerm);
      if (!search) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    // Simple text search in 'name' and 'description' fields (adjust fields as needed)
    const searchRegex = new RegExp(searchTerm, 'i','g'); // 'i' for case-insensitive
    const products = await Product.find({
        $or: [
            { title: searchRegex },
            { slug: searchRegex },
        ],
    });

    res.status(200).json(products);


      if (!search) {
          return res.status(400).json({ error: 'Search query is required' });
      }
     
    
    }catch(error){
      console.log(error)
      res.status(500).json({error:'internal error'})
    }
   }              


   //filter 
  export const filter = async (req, res) => {
    const { subCategories, sort,priceRange } = req.body;
console.log("sort",sort)
try {
  let query = {};
  if (subCategories && subCategories.length > 0) {
      query.slug = { $in: subCategories };
  }

  if (priceRange) {
    switch (priceRange) {
        case 'below500':
            query.sellingPrice = { $lt: 500 };
            break;
        case '500to1000':
            query.sellingPrice = { $gte: 500, $lte: 1000 };
            break;
        case '1001to1500':
            query.sellingPrice = { $gte: 1001, $lte: 1500 };
            break;
        case '1501to2000':
            query.sellingPrice = { $gte: 1501, $lte: 2000 };
            break;
        case '2001to2500':
            query.sellingPrice = { $gte: 2001, $lte: 2500 };
            break;
        default:
            break;
    }
}

  let sortOption = {};
  if (sort === 'lowToHigh') {
      sortOption = { sellingPrice: 1 };
  } else if (sort === 'highToLow') {
      sortOption = { sellingPrice: -1 };
  }

  const products = await Product.find(query).sort(sortOption);
  res.json(products);
} catch (err) {
  res.status(500).json({ error: 'Error fetching products' });
}
};
