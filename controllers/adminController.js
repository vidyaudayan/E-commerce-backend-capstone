import bcrypt from "bcrypt";
import Admin from "../Model/adminModel.js";
import { adminToken } from "../utils/generateToken.js";



  export const singup = async (req, res) => {
    try {
      console.log(req.body);
  
      const { email, password, name } = req.body;
      const adminExist = await Admin.findOne({ email });
      if (adminExist) {
        return res.send("Admin is already exist");
      }
  
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
  
      const newAdmin = new Admin({
        name,
        email,
        hashPassword,
        role: "admin",
      });
      const newAdminrCreated = await newAdmin.save();
  
      if (!newAdminrCreated) {
        return res.send("Admin is not created");
      }
  
      const token = adminToken(newAdminrCreated);
      res.cookie("token", token);
      res.json({ message: "signed in!", token });
    } catch (error) {
      console.log(error, "Something wrong");
    }
  };


  export const singin = async (req, res) => {
    try {
      
      const { email, password } =req.body;
     
  //console.log(req.body)
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.send("Admin is not found");
      }
  //console.log(admin.hashPassword)
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
  
      const token = adminToken(admin);
  
      res.cookie("token", token);
      res.json({ message: "Logged in!", token });
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("Internal Server Error");
    }
  };



  export const getAllAdmins = async (req, res) => {
    const admins = await Admin.find();
    return res.send(admins);
  };





  export const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const admin = await Admin.find({ _id: id });
    if (!admin) {
      return res.send("Admin is not exist");
    }
    const deleteadmin = await Admin.deleteOne({ _id: id });
  
    if (!deleteadmin) {
      return res.send("failed to delete");
    }
  
    return res.send("deleted sucessfully");
  };
  