import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    
    },
    image: {
      type: String,
    },

   description: {
      type: String,

      minLength: 6,
    },
    sellingPrice: {
      type: Number,
     
    },
    price: {
      type: Number,
       
      
    },
    slug:{
        type:String, 
       
    },
    description:{  
      type:String,
      
      
  },
  status: { type: String, default: 'unverified' },
    productPictures: [String ],
    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
   
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps : true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;