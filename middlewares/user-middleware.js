import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


/* const authenticateUser = (req, res, next) => {
  // Assuming you have some logic to verify the token and get user data
  const token = req.cookies.token ;
  console.log("token middle", token)
  if (!token) {
      return res.status(401).json({
        message:"Please login..",
        
      });
  }

  try {
      const decoded = jwt.verify(token, process.env.SE);
      req.user = decoded; // Attach user data to the request object
      next();
  } catch (err) {
    let errorMessage = 'Unauthorized';
    if (err.name === 'JsonWebTokenError') {
      // Specific error handling for JWT errors
      switch (err.message) {
        case 'invalid signature':
          errorMessage = 'Invalid token signature';
          break;
        case 'jwt expired':
          errorMessage = 'Token expired';
          // Optional: Implement token refresh logic here (if applicable)
          break;
        default:
          // Handle other JWT errors
      } }
      return res.status(401).send({ message: errorMessage });
  }
};

// Example token verification function (replace with your logic)
//const verifyToken = (token) => {
  // Logic to verify token and return user data
  // For example:
  //return jwt.verify(token, process.env.SE);
//;*/




function authenticateUser(req, res, next) {
  const token = req.cookies.token; // Assuming cookie name

  try {
    const decoded = jwt.verify(token, process.env.SE);
    // Check if role claim exists and is authorized for the route
    if (decoded.role ) {
      req.user = decoded; // Store decoded user data for further use
      next(); // Allow access to the route
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    // Handle JWT verification errors
    return res.status(401).json({ message: 'Unauthorized' });
  }
}




export default authenticateUser 