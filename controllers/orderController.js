import Order from '../Model/orderModel.js';
import Product from '../Model/productModel.js';
import Address from '../Model/AddressModel.js';
import mongoose from 'mongoose';
import User from '../Model/userModel.js';
// Create order
/*export const createOrder = async (req, res) => {
  try {
    const { products, paymentId,user_id } = req.body;
  
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({ message: `Product with id ${item.product_id} not found` });
      }
      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      user_id: user_id,
      products,
      total_price: totalPrice,
      payment_id: paymentId,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' });
  }
};*/


// view user order
export const getUserOrders = async (req, res) => {
    try {
      const user = req.user;
      const userId = req.user.id;
    console.log("user id",userId)
      const orders = await Order.find({user_id:userId}).populate({
        path: 'products.product_id',
        select: 'title price productPictures'
      });
  console.log("orders",orders)

  if (!orders) {
    console.log("No orders found for user:", userId);
    return res.status(200).json({ message: 'No orders found' });
  }
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



  /*export const getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("user id:", userId);
  
      // Find orders where the user_id matches the logged-in user's ID
      const orders = await Order.find({ user_id: mongoose.Types.ObjectId(userId) }).populate('products.product_id', 'name price');
      console.log("orders:", orders);
  
      if (!orders.length) {
        console.log("No orders found for user:", userId);
        return res.status(200).json({ message: 'No orders found' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };*/

  // Get all orders
 const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('customer').populate('products');
        res.json(orders);
        console.log("orders",orders)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


  // get specific order

  export const getOrderById = async (req, res) => {
    try {
      const {orderId} = req.params;
      const order = await Order.findById(orderId).populate('products.product_id', 'name price');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(order);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  export const createOrder = async (req, res) => {
    try {
      const { products, address,totalPrice } = req.body;
      const user_id = req.user.id;
      
      console.log('Received order request');
      console.log('Products:', products);
      console.log(' price:', totalPrice);
      console.log('User ID:', user_id);
      console.log('Address:', address);
      
      const newAddress = new Address({
        houseName: address.houseName,
        street: address.street,
        city: address.city,
        state: address.state,
        pinCode: address.pinCode,
        country: address.country,
      }); 
      
      await newAddress.save();
      console.log("working",newAddress)
   
     
  
      const order = new Order({
        user_id: user_id,
        products,
        total_price: totalPrice,
        
        address: newAddress._id, 
      });
  
      await order.save();
  console.log("order", order)
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Place order

 export const placeOrder = async (req, res) => {
    const { customerName, productIds } = req.body;

    try {
       
      const products = await Product.find({ '_id': { $in: productIds } });
     
        const order = new Order({
            customer: { name: customerName },
            products: productIds,
            status: 'pending'
        });
        console.log("order..", order)
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
        console.log(error)
    }
};


  export default getAllOrders