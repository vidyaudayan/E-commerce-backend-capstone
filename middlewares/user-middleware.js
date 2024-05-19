import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/*function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.SE, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    console.log(req.user.role);

    next();
  });
}*/

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }
  
    jwt.verify(token, process.env.SE, (err, decoded) => {
      if (err) {
        return res.status(403).send('Invalid token.');
      }
  
      req.user = decoded; // Attach decoded token to request object
      console.log(req.user)
      next();
    });
  };

export default authenticateUser;;