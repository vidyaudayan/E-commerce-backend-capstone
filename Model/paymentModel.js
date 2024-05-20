import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
      },
      payment_method: {
        type: String,
        required: true
      },
      payment_status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
      },
      amount: {
        type: Number,
        required: true
      },
      transaction: {
        type: String,
        required: true
      },
      },
  { timestamps : true }
);

const Payment= mongoose.model("Payment", paymentSchema);
export default Payment;