import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },

   description: {
      type: String,
      required: true,
      minLength: 6,
    },
    price: {
      type: Number,
      required: true,
      
    },
    slug:{
        type:String,
        required:true,
        
    },
    productPictures: [
        { img: { type: String } }
    ],
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