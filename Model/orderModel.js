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
          price_at_purchase: {
            type: Number,
            required: true
          }
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
        required: true
      },
      },
  { timestamps : true }
);

const Order= mongoose.model("Order", orderSchema);
export default Order;