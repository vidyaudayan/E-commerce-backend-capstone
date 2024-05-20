import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
       unique: true
      },
      description: {
        type: String,
        required: true,
     
      },
      slug: {
        type: String,
        required: true,
       
       
      },
      thumbnail: {
        type: String,
        required: true
      },
      products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'}],
      },
  { timestamps : true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;