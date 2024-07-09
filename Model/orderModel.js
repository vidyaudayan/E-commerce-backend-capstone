import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
     
      },
      products: [
        {
          product_id: {
            type:mongoose. Schema.Types.ObjectId,
            ref: 'Product',
           
          },
          quantity: {
            type: Number,
        
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
      customer: {
        name: { type: String }
    }
      },
  { timestamps : true }
);

const Order= mongoose.model("Order", orderSchema);
export default Order;    