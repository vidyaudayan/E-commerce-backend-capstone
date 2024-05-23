import bcrypt from "bcrypt";
import Seller from "../Model/sellerModel.js";
import  generateSellerToken, { adminToken }  from '../utils/generateToken.js';
import generateToken from "../utils/generateToken.js";

// seller signup
export const sellerSignup=async(req,res)=>{
    try{
        console.log(req.body)
        const {name,password,email,phone}=req.body;
        const sellerExist= await Seller.find({email});
        if(!sellerExist){
          return  res.send("seller already exists")
        }
    
        const saltRounds= 10;
        const hashPassword= await bcrypt.hash(password,saltRounds)
  const newSeller= new Seller({name,hashPassword,email,phone,  role: "seller"})
  
  const newSellerCreated= await newSeller.save();
  console.log(newSellerCreated)
   
  if(!newSellerCreated){
    return res.send("Seller not created")
}

 
  const token= generateSellerToken(newSellerCreated);
  res.cookie("token",token)

res.send("Signup successful")

    }catch(error){
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
   
};

// seller signin

export const sellerSignin= async (req, res) => {
    try {
      
      const { email, password } =req.body;
     
      const seller= await Seller.findOne({ email });
 
      if (!seller) {
        return res.send("seller is not found");
      }

  const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const matchPassword = await bcrypt.compare(
        password,
        hashPassword
      );
  
      console.log(matchPassword, "matchpassword");
      if (!matchPassword) {
        return res.send("password is not match");
      }
  
      const token =adminToken(seller);
  
      res.cookie("token", token);
      console.log(token)
      res.json({ message: "Logged in!", token });
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("Internal Server Error");
    }
  };


// Update Seller Information
export const updateSeller = async (req, res) => {
    try {
      const  id = req.params.sellerId; // Assuming req.user contains authenticated seller info
      const { name, phone, email } = req.body;
  
      const updatedSeller = await Seller.findByIdAndUpdate(
        { _id: id},{ name, phone, email },{ new: true });
  
      if (!updatedSeller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      res.status(200).json(updatedSeller);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
