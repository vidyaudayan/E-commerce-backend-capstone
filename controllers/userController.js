import bcrypt from "bcrypt";
import User from "../Model/userModel.js";
import  generateToken  from "../utils/generateToken.js";

export const signup=async(req,res)=>{
    try{
        console.log(req.body)
        const {firstName,lastName,password,email,phoneNumber}=req.body;
        const userExist= await User.find({email});
        if(!userExist){
          return  res.send("user already exists")
        }
    
        const saltRounds= 10;
        const hashPassword= await bcrypt.hash(password,saltRounds)
  const newUser= new User({email,firstName,lastName,hashPassword,phoneNumber})
  
  const newUserCreated= await newUser.save();
  console.log(newUserCreated)
   
  if(!newUserCreated){
    return res.send("User not created")
}

 
  const token= generateToken(newUserCreated);
  res.cookie("token",token)

res.send("Signup successful")

    }catch(error){
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
   
};


export const signin= async(req,res)=>{
    try{
const {email,password,firstName,lastName}=req.body
const user= await User.findOne({email})
console.log(user)
if(!user){
    return res.send("user not exist")
}
const matchPassword= await bcrypt.compare(password,user.hashPassword)
if(!matchPassword){
    return res.send("password incorrect")
}

const token= generateToken(user)
res.cookie("token", token);
res.send("Logged in!");


    }catch(error){
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}



export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select('-password'); 
console.log(user)
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName:user.lastName,
      email: user.email,
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
