import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey= process.env.SE;
const generateToken= (email)=>{
return jwt.sign({data:email},secretKey,{expiresIn:"1d"})
}
export const adminToken = (user) => {
    return jwt.sign({ data: user.id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });
  };

export default generateToken;