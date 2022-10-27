const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer");
const e = require("express");
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"foodorafoodservice@gmail.com",
        pass:"eysfgrqlyxuxzbsm"
    }
})
const userCtrl = {
  register: async (req, res) => {
    try {
      let { username, email, password } =
        req.body;
        email=email.toLowerCase();
      const users = await UserModel.findOne({ email });
      if (!users) {
        // if (password !== cpassword) {
        //   throw new Error("Password and confirm password do not match!");
        // }
        // if (contact.length > 13) {
        //   throw new Error("Incorrect Credentials");
        // }
        
        const passwordHash = await bcrypt.hash(password, 12);
        const user = UserModel({
          username,
          email,
          password: passwordHash,
        });
        await user.save();

        res.status(200).json({
          success: true,
          data: user,
          msg: "Registration successful",
        });
        const mailoptions={
          from:"foodorafoodservice@gmail.com",
          to:email,
          subject:"Dear Customer, sign up to your foodora account is successfull !",
          text:"We are really happy to welcome you to our growing family of food lovers. Thank you for showing your interest in our services."
        }
        transporter.sendMail(mailoptions,(err,info)=>{
        if(err){
            console.log(err);
          }
          else{
            console.log("mail sent");
          }
        })
      } 
      else {
        res.status(400).json({ success: false, msg: "User already exists!" }); 
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: "Registration failed!" });
      console.log(error);
    }
  },
  getUsers: async (req, res) => {
    try {
      const result = await UserModel.find();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Operation failed!" });
      console.log(error);
    }
  },
  signin: async (req, res) => {
    try {
      var passw=0;
      var ema=0;
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user){ 
          ema=1;  
          throw new Error("No user found!");
          
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result){
         passw=1;
         throw new Error("Invalid credentials!");
      }
      
      res.status(200).json({
        success: true,
        msg: "Login successful",
      });
    } catch (error) {
      if(passw==1){
      res.status(400).json({ success: false, msg: "Wrong Password!" });
      console.log(error);
      }
      if(ema==1){
        res.status(400).json({ success: false, msg: "User with this email does not exist!" });
        console.log(error);
        }
    }
    
  },
};
module.exports = userCtrl;
