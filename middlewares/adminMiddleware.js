import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin from "../Model/adminModel.js";

dotenv.config();

function  authenticateAdmin (req, res, next) {
  const token = req.cookies.token;

const decoded= jwt.verify(token, process.env.SE, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);
    

    req.user = user;
console.log(req.user)
    console.log(req.user.role);
    
    if (req.user.role !== "admin") {
      return res.send("not authenticated");
    }
    next();
  });
}

export default authenticateAdmin;


 /*const authenticateAdmin= async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SE);
    const admin = await Admin.findById(decoded.id).select('-password'); // Find admin by ID and exclude password

    if (!admin) {
      return res.status(404).send('Admin not found');
    }

    req.admin = admin; // Attach admin object to req.admin
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate as admin.' });
  }
};

export default authenticateAdmin;*/