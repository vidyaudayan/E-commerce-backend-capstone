import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    houseName: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pinCode: {
      type: String,
      required: true
    },
    
   
  });
  const Address = mongoose.model('Address', addressSchema);

export default Address;
  