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
        
  // Update product quantity in cart

/*export const updateCart = async (req, res) => {
    try {
 console.log("cart update")
 const user_id = req.user.id
      const { productId, newQuantity } = req.body;
      const cart = await Cart.findOne({ user: user_id }).populate('products.product');;
  console.log("cart updte", cart)
      if (!cart) {
        return res.status(404).send('Cart not found.');
      }
  
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    
      if (productIndex > -1) {
      
        cart.products[productIndex].quantity = newQuantity;
      } else {
        return res.status(404).send('Product not found in cart.');
      }
  
      await cart.save();
      cart = await Cart.findOne({ user: user_id }).populate('products.product');
      res.status(200).json(cart);
      console.log("success")
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }  
  }; */


  /*export const updateCart = async(req,res)=>{
    try{
        const currentUserId = req.user.id 
        const addToCartProductId = req?.body?.productId

        const qty = req.body.newQuantity

        const updateProduct = await Cart.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })
console.log("updated",updateProduct)
        res.json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Assuming you have a userId from the session or JWT token
    const userId = req.user.id; // For example, from req.user if you use passport.js or JWT middleware
    
    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ user: userId, items: [] });
    } else if (!Array.isArray(cart.items)) {
      // Ensure cart.items is an array
      cart.items = [];
    }
   
    // Update the quantity in the cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Update the existing product quantity
      cart.items[itemIndex].quantity = quantity;
    } else {
      // Add new product to cart
      cart.items.push({ product: productId, quantity });
    }

    cart = await Cart.findByIdAndUpdate(
      cart._id,
      { items: cart.items },
      { new: true, runValidators: true }
    ).populate('products.product');
    console.log("work", cart)

    res.json(cart);
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
   
}*/
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
      // If no cart exists for the user, create a new one
      cart = new Cart({
        user: userId, 
        products: [{ product: productId, quantity }]
      });  
    } else {
      // Find the index of the product in the cart
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

      if (productIndex > -1) {
        // Update the existing product quantity
        cart.products[productIndex].quantity = quantity;
      } else {
        // Add new product to cart
        cart.products.push({ product: productId, quantity });
      }
    }

    // Save the updated cart
    await cart.save();

    // Retrieve the updated cart with populated product details
    cart = await Cart.findOne({ user: userId }).populate('products.product');

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};


