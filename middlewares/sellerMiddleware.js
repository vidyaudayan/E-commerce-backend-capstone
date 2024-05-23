import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

 function authenticateSeller(req, res, next) {
  const token = req.cookies.token;
console.log(token)
  jwt.verify(token, process.env.SE, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    console.log(req.user.role);
    
    if (req.user.role !== "seller") {
      return res.send("not authenticated");
    }
    next();
  });
}

export default authenticateSeller;