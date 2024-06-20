import bcrypt from "bcrypt";
import User from "../Model/userModel.js";
import  generateToken, { adminToken }  from "../utils/generateToken.js";
import crypto from 'crypto'

// create new user
 
export const signup=async(req,res)=>{
    try{
        console.log(req.body)
        const {firstName,lastName,password,email,phoneNumber}=req.body;
        const userExist= await User.findOne({email});
        if(userExist){
          return  res.status(409).send("user already exists")
        }
    
        const saltRounds= 10;
        const hashPassword= await bcrypt.hash(password,saltRounds)
  const newUser= new User({email,firstName,lastName,hashPassword,phoneNumber,role:"user"})
  
  const newUserCreated= await newUser.save();
  console.log(newUserCreated)
   
  if(!newUserCreated){
    return res.status(500).send("User not created")
}

 
  const token= generateToken(newUserCreated);
  res.cookie("token",token, {secure:false})

res.send("Signup successful")

    }catch(error){
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
   
};

// user signin
export const signin= async(req,res)=>{
    try{
const {email,password,firstName,lastName}=req.body
const user= await User.findOne({email})
console.log(user)
if(!user){
    return res.send("user not exist")
}
const matchPassword=  bcrypt.compare(password,user.hashPassword)
if(!matchPassword){
    return res.send("password incorrect")
}

const token= generateToken(user)
res.cookie("token", token,{secure:false});
res.status(200).json({
  message : "Login successfully",
  data : token,
  success : true,
  error : false
})


    }catch(error){
        console.log(error, "Something wrong");
        res.status(500).send("Internal Server Error");
    }
}


// get user profile
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
      role:user.role
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


//Get user reviews
export const getUserReviews = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('reviews');
    if (!user) {
      return res.status(404).send('User not found.');
    }
    res.status(200).json(user.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
};

// user logout

export const logout = (req, res) => {
  try {
   
    res.clearCookie('token');
    
    res.status(200).json({ message: 'Logout successful',error : false,
    success : true,
    data : []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'||error,  error : true,
    success : false, });
  }
};

// forgot password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address is required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

  
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now()+3600000 ; 

    
    user.resetToken = resetToken;
    console.log(resetToken)
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

  
    /*if (process.env.NODE_ENV !== 'test') { 
      const transporter = nodemailer.createTransport({
       
      });

      const resetUrl = `http://your-website.com/reset-password?token=${resetToken}`; // Replace with your reset password URL
      const mailOptions = {
        from: '"Your App Name" <your-email@example.com>',
        to: email,
        subject: 'Password Reset Request',
        text: `You have requested a password reset for your account. Please click on the following link to reset your password: ${resetUrl}`,
      };

      await transporter.sendMail(mailOptions);
    }*/

   
    res.status(200).json({ message: 'Password reset instructions have been sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};



// reset password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    if (!resetToken || !password) {
      return res.status(400).json({ message: 'Reset token and new password are required.' });
    }
    const user = await User.findOne({
      resetToken: resetToken,
      resetTokenExpiration:  { $gt: Date.now() }
    });
    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset token.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.resetToken = undefined; 
    user.resetTokenExpiration = undefined; 
    await user.save();


    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

