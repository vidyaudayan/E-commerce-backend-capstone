import Review from "../Model/reviewModel.js";
import Product from "../Model/productModel.js";
import User from "../Model/userModel.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { product_id, rating, comment,user_id } = req.body;
  
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).send('Product not found.');
    }
    const newReview = new Review({
      product_id,
      user_id,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
   
    await User.findByIdAndUpdate(user_id, { $push: { reviews: savedReview._id } });

    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};



// Get all reviews for a product
export const getProductReviews = async (req, res) => {
    try {
      const { product_id } = req.params;
  
      // Check if the product exists
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(404).send('Product not found.');
      }
  
      const reviews = await Review.find({ product_id }).populate('user_id', 'firstName lastName');
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  };
  
  // Get a single review by ID
export const getReviewById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const review = await Review.findById(id).populate('user_id', 'firstName lastName');
      if (!review) {
        return res.status(404).send('Review not found.');
      }
  
      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  };

  // Update a review
export const updateReview = async (req, res) =>
{
      try {
        const { id } = req.params;
        const { rating, comment } = req.body;
    
  
        const updatedReview = await Review.findByIdAndUpdate(
          id,
          { rating, comment },
          { new: true, runValidators: true }
        );
    
        if (!updatedReview) {
          return res.status(404).send('Review not found.');
        }
    
        res.status(200).json(updatedReview);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
      }
    };


    // Delete a review
export const deleteReview = async (req, res) => {
    try {
      const { id } = req.params;
  
     
      const deletedReview = await Review.findByIdAndDelete(id);
  
      if (!deletedReview) {
        return res.status(404).send('Review not found.');
      }
  
      res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  };