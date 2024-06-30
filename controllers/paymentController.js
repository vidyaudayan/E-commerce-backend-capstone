import Payment from "../Model/paymentModel.js";
import Order from "../Model/orderModel.js";
import stripe from "../config/stripe.js";
import Cart from "../Model/cartModel.js";
import { decode } from "jsonwebtoken";


// Create payment

export const createPayment = async (req, res) => {
  try {
    const { order, payment_method, amount, transaction } = req.body;

    const existingOrder = await Order.findById(order);
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    const payment = new Payment({
      order,
      payment_method,
      amount,
      transaction,
      payment_status: "pending",
    });

    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get payments by Id

export const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId).populate(
      "order",
      "user_id total_price"
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const createCheckout = async (req, res) => {
  try {
  
    const cartItems = req.body;
    const platformFeeInCents = 1700;
    
   
    console.log("cartitems", cartItems);
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options:[
        {
         shipping_rate:'shr_1PUnyy034vlmTYiPdPkDeWBN'
        }
      ],
      customer_email: req.user.email, 

      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.product.title,
              images: item.product.productPictures,
              metadata: {
                productId: item.product._id,
              },
            },
            unit_amount: Math.round(item.product.sellingPrice * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      
        
      }),

     
     //success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      //cancel_url: "http://localhost:5173/cancel",

      
   
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

  
    const session = await stripe.checkout.sessions.create(params);
    console.log("session", session);

    
   /// await Cart.findOneAndUpdate({ user_id: req.user.id}, { items: [] });
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
  
//checkoutSuccess

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body; 
console.log("workk", req.body)
   
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ message: "Invalid or unpaid session" });
    }    

    const userId = session.metadata.userId; 


    await Cart.findOneAndUpdate({ user_id: userId }, { items: [] },{ $set: { products: [] } });
  

    const orderId = session.metadata.orderId; 
    await Order.findByIdAndUpdate(orderId, { status: "paid" });

    res.status(200).json({ message: "Payment successful, cart cleared, and order status updated" });
  } catch (error) {
    console.error("Error in checkout success handler: ", error);
    res.status(500).json({ message: "Server error" });
  }
};  