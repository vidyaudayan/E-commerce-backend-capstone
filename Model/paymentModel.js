import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
      },
      payment_method: {
        type: String,
       
      },
      payment_status: {
        type: String,
       
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
      },
      amount: {
        type: Number,
    
      },
      transaction: {
        type: String,
       
      },
      },
  { timestamps : true }
);

const Payment= mongoose.model("Payment", paymentSchema);
export default Payment;