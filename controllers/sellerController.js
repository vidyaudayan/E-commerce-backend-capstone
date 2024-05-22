import bcrypt from "bcrypt";
import Seller from "../Model/sellerModel.js";
import  generateSellerToken  from '../utils/generateToken.js';
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
  const newSeller= new Seller({name,hashPassword,email,phone})
  
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

export const sellerSignin= async(req,res)=>{
    try{
const {password,email} =req.body
const seller= await Seller.findOne({email})
console.log(seller)
if(!seller){
    return res.send("seller not exist")
}
const matchPassword= await bcrypt.compare(password,seller.hashPassword)
if(!matchPassword){
    return res.send("password incorrect")
}

const token= generateSellerToken(seller)
res.cookie("token", token);

res.send("Logged in!");


    }catch(error){
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}