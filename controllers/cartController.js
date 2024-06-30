import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";
import mongoose from "mongoose";

// Add product to cart
export const addToCart = async (req, res) => {
    try {
      const { productId, quantity} = req.body;
      console.log("Request user object:", req.user); 
      const user_id = req.user.id;
 console.log("user",user_id)
   
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send('Product not found.');
      }
    
     
      let cart = await Cart.findOne({ user: user_id });
  
      if (cart) {   
    
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
  
        if (productIndex > -1) {
          
          cart.products[productIndex].quantity += quantity;
        } else {
          
          cart.products.push({ product: productId, quantity });
        }
      } else {
        
        cart = new Cart({
          user: user_id,
          products: [{ product: productId, quantity }]
        });
      }
  
      await cart.save();
      res.status(201).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  };
  
  // View user's cart
export const getCart = async (req, res) => {
    try {
      const user_id = req.user.id
      console.log("userId",user_id)
      const cart = await Cart.findOne({user: user_id }).populate('products.product');
  
      if (!cart) {
        return res.status(404).send('Cart not found.');
      }
      const totalItems = cart.products.reduce((acc, item) => acc + item.quantity, 0);
      res.status(200).json({ cart, totalItems });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  };
        



  // Delete product from cart
export const deleteFromCart = async (req, res) => {
    try {
      console.log("cart")
      const userId = req.user.id;
      const { productId }= req.params;
    
    
  console.log(userId)
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).send('Cart not found.');
      }
  
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
     
      if (productIndex > -1) {
        
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).json(cart);
      } else {
        return res.status(404).send('Product not found in cart.');
      }
    } catch (error) {  
      console.error(error);
      res.status(500).send('Server error.');
    }
  };    

 
// upsate cart
export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("Request user object:", req.user); 
    const userId = req.user.id;
    console.log("user", userId);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found.');
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {

      cart = new Cart({
        user: userId, 
        products: [{ product: productId, quantity }]
      });  
    } else {
      
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

      if (productIndex > -1) {
     
        cart.products[productIndex].quantity = quantity;
      } else {
      
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();


    cart = await Cart.findOne({ user: userId }).populate('products.product');

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};

// clearCartAfterPayment

export const clearCartAfterPayment = async (req, res) => {
  try {
    const userId = req.user.id; 

   
    await Cart.findOneAndUpdate({ user: userId }, { $set: { products: [] } });

    res.status(200).json({ message: 'Cart cleared successfully.' });
  } catch (error) {
    console.error("Error clearing cart: ", error);
    res.status(500).json({ message: 'Server error' });
  }
};