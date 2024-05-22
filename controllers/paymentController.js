import Payment from "../Model/paymentModel.js";
import Order from '../Model/orderModel.js'

// Create payment

export const createPayment = async (req, res) => {
    try {
      const { order, payment_method, amount, transaction } = req.body;
  
  
      const existingOrder = await Order.findById(order);
      if (!existingOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      const payment = new Payment({
        order,
        payment_method,
        amount,
        transaction,
        payment_status: 'pending'  
      });
  
      await payment.save();
  
      res.status(201).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}


//get payments by Id

export const getPaymentById = async (req, res) => {
    try {
      const {paymentId }= req.params
      const payment = await Payment.findById(paymentId).populate('order', 'user_id total_price');
  
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      res.status(200).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

