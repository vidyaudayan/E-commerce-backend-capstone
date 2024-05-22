import Order from '../Model/orderModel.js';
import Product from '../Model/productModel.js';

// Create order
export const createOrder = async (req, res) => {
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
};


// view user order
export const getUserOrders = async (req, res) => {
    try {
      const {user_id} = req.params;
    
      const orders = await Order.find( user_id ).populate('products.product_id', 'name price');
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
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
  
  
