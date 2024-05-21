import Cart from "../Model/cartModel.js";
import Product from "../Model/productModel.js";
import mongoose from "mongoose";

// Add product to cart
export const addToCart = async (req, res) => {
    try {
      const { productId, quantity,user_id } = req.body;
    
  
   
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
      const user_id = req.body
      const cart = await Cart.findOne( user_id ).populate('products.product');
  
      if (!cart) {
        return res.status(404).send('Cart not found.');
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  };

  // Update product quantity in cart

  export const updateCart = async (req, res) => {
    try {
 
      const { productId, quantity,user_id } = req.body;
      const cart = await Cart.findOne({ user: user_id });
  
      if (!cart) {
        return res.status(404).send('Cart not found.');
      }
  
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
  
      if (productIndex > -1) {
      
        cart.products[productIndex].quantity = quantity;
      } else {
        return res.status(404).send('Product not found in cart.');
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  };
  
  // Delete product from cart
export const deleteFromCart = async (req, res) => {
    try {
 
      const { productId , user_id}= req.params;
    
    
  console.log(user_id)
      const cart = await Cart.findOne({user_id });
  
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