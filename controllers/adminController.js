import bcrypt from "bcrypt";
import Admin from "../Model/adminModel.js";
import { adminToken } from "../utils/generateToken.js";
import User from "../Model/userModel.js";
import Product from "../Model/productModel.js";
import Order from "../Model/orderModel.js";
import Payment from "../Model/paymentModel.js";


// Admin signup
  export const singup = async (req, res) => {
    try {
      console.log(req.body);
  
      const { email, password, name } = req.body;
      const adminExist = await Admin.findOne({ email });
      if (adminExist) {
        return res.send("Admin is already exist");
      }
  
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
  
      const newAdmin = new Admin({
        name,
        email,
        hashPassword,
        role: "admin",
      });
      const newAdminrCreated = await newAdmin.save();
  
      if (!newAdminrCreated) {
        return res.send("Admin is not created");
      }
  
      const token = adminToken(newAdminrCreated);
      res.cookie("token", token);
      res.json({ message: "Admin signed in!", token });
    } catch (error) {
      console.log(error, "Something wrong");
    }
  };

// Admin signin
  export const singin = async (req, res) => {
    try {
      
      const { email, password } =req.body;
     
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(404).send("Admin is not found");
      }

  const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const matchPassword = await bcrypt.compare(
        password,
        hashPassword
      );
  
      console.log(matchPassword, "matchpassword");
      if (!matchPassword) {
        return res.send("password is not match");
      }
  
      const token = adminToken(admin);
      res.cookie("token", token,{httpOnly:true,secure:false});
      res.status(200).json({
        message : "Login successfully",
        data : token,
        success : true,
        error : false
      })
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("Internal Server Error");
    }
  };

// admin profile

export const getAdminProfile = async (req, res) => {
  try {

   const admin = await Admin.findById(req.id).select('-password'); 
console.log(admin)
if (!admin) {
return res.status(404).send('admin not found');
}
   
    res.status(200).json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role:admin.role
     
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}



// Get all admins
  export const getAllAdmins = async (req, res) => {
    const admins = await Admin.find();
    return res.send(admins);
  };

// Delete admin
  export const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const admin = await Admin.find({ _id: id });
    if (!admin) {
      return res.send("Admin is not exist");
    }
    const deleteadmin = await Admin.deleteOne({ _id: id });
  
    if (!deleteadmin) {
      return res.send("failed to delete");
    }
  
    return res.send("deleted sucessfully");
  };


  // Get all users
  export const getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.json(users)
  };

// Get one user by Id
  export const getOneUserById= async (req, res) => {
    try{
      const user=await User.findOne({userId:req.params.id}).exec()
      if(!user){
       res.status(404).json({error:'User not found'})
      }
      res.status(200).json(user)
      }catch(error){
       console.log(error)
       res.status(500).json({error:'internal error'})
      }
  }


// Update user
  export const updateUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    const { firstName,lastName,email } = req.body;
  
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { firstName,lastName,email  },{new: true,}
    );
  
    if (!updatedUser) {
      return res.send("User is not updated");
    }
    return res.send(updatedUser);
  };

// Delete user
  export const deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await User.find({ _id: id });
    if (!user) {
      return res.send("User is not exist");
    }
    const deleteUser = await User.deleteOne({ _id: id });
  
    if (!deleteUser) {
      return res.send("failed to delete");
    }
  
    return res.send("deleted sucessfully");
  };
  
// Update product
 export  const updateProduct = async (req, res, next) => {
    const _id = req.params.id;
    console.log(_id);
  
    const { title,image,description,price,sellingPrice,slug,category,productPictures,reviews} = req.body;
  try{
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { title,image,description,price,sellingPrice,slug,category,productPictures,reviews},
      {
        new: true,
      }
    );
  
    if (!updatedProduct) {
      return res.status(404).send("Product is not updated");
    }
      
    console.log(updatedProduct);
    return res.send(updatedProduct);

  
  }catch(error){
    console.error(error);
    return res.status(500).send("Internal server error");
  }

  }
   

  // delete product
  export const deleteProduct = async (req, res) => {
    const id = req.params.id;
  
    const deleteId = await Product.deleteOne({ _id: id });
  
    if (!deleteId) {
      return res.send("not deleted");
    }
    return res.send("Product deleted");
  };
  
  // update order status

export const updateOrderStatus = async (req, res) => {
    try {
      const {orderId} = req.params;
      const { status } = req.body;
  
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      if (!['pending', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
//get all payments
  export const getAllPayments = async (req, res) => {
    try {
      const payments = await Payment.find().populate('order', 'user_id total_price');
  
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// update payment status
  export const updatePaymentStatus = async (req, res) => {
    try {
      const {paymentId} = req.params;
      const { payment_status } = req.body;
  
      const payment = await Payment.findById(paymentId);
  
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      if (!['pending', 'completed', 'failed'].includes(payment_status)) {
        return res.status(400).json({ message: 'Invalid payment status' });
      }
  
      payment.payment_status = payment_status;
      await payment.save();
  
      res.status(200).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  