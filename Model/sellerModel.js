import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      
    },
   hashPassword: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      }
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      }
    ],
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
        },
      }
    ],
  },
  { timestamps: true }
);

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;
