import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 30,
    },
    hashPassword: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    phoneNumber: {
      type: Number,
     
    },
    role: {
      type: String,
      enum: ["user"],
    },
    resetToken: String,
    resetTokenExpiration: Date,
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps : true }
);

const User = mongoose.model("User", userSchema);
export default User;