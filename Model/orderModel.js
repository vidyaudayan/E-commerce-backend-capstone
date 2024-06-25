import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      products: [
        {
          product_id: {
            type:mongoose. Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            min: 1
          },
         
        }
      ],
      total_price: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
      },
      payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
       
      },
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
       
      },
      },
  { timestamps : true }
);

const Order= mongoose.model("Order", orderSchema);
export default Order;