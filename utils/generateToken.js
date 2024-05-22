import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey= process.env.SE;
const generateToken= (user)=>{
return jwt.sign({id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName},secretKey,{expiresIn:"1d"})
}
export const adminToken = (user) => {
    return jwt.sign({ data: user.id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });
  };

  export const generateSellerToken= (seller)=>{
    return jwt.sign({id: seller.id, email: seller.email,name: seller.name},secretKey,{expiresIn:"1d"})
    }

export default generateToken;