const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer=require("nodemailer");
const e = require("express");
const otpGenerator = require('otp-generator')


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
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        const passwordHash = await bcrypt.hash(password, 12);
        const user = UserModel({
          username,
          email,
          password: passwordHash,
          otp,
        });
        await user.save();

        res.status(200).json({
          success: true,
          msg: "Registration successful",
        });
        const mailoptions={
          from:"foodorafoodservice@gmail.com",
          to:email,
          subject:"Dear Customer, sign up to your foodora account is successfull !",
          html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the club. ${username}</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">"We are really happy to welcome you to our growing family of food lovers. Thank you for showing your interest in our services."</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
     </div>
      `,
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
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("No user found!");
      const result = await bcrypt.compare(password, user.password);
      if (!result) throw new Error("Invalid credentials!");
      
      res.status(200).json({
        success: true,
        msg: "Login successful",
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Login failed!" });
      console.log(error);
    }
  },
  sendOTP : async (req,res) =>{
    try {
      // console.log(req.route.path);
      const{email,resend} = req.body;
      
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("No user found!");
      if(resend){
        user.otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        user.save();
      }
      const mailoptions={
        from:"foodorafoodservice@gmail.com",
        to:email,
        subject:"Foodora Verification OTP",
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the club.</h2>
          <h4>You are officially In ✔</h4>
          <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${user.otp}</h1>
     </div>
      `,
      }
      transporter.sendMail(mailoptions,(err,info)=>{
        if(err){
            console.log(err);
          }
          else{
            console.log("mail sent");
          }
        });

        res.status(200).json({
          success: true,
          msg: "mail sent",
        });
    } 

    
    catch (error) {
      res.status(400).json({ success: false, msg: "mail send failed!" });
      console.log(error);
    }




  },
  forgot : async (req,res) =>{
    try {
      

      res.status(200).json({
        success: true,
        msg: "Login successful",
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Reset failed!" });
      console.log(error);
    }




  },
  verify : async (req,res) =>{
    try {
      // console.log(req.route.path);
      const{email,otp} = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error("No user found!");
      if(user.otp == otp){
        res.status(200).json({
          success: true,
          msg: "user verified",
        });}
        else
        res.status(400).json({ success: false, msg: "OTP incorrect" });
    } 

    
    catch (error) {
      res.status(400).json({ success: false, msg: "mail send failed!" });
      console.log(error);
    }




  },
  forgot : async (req,res) =>{
    try {
      

      res.status(200).json({
        success: true,
        msg: "Login successful",
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: "Reset failed!" });
      console.log(error);
    }




  },
};
module.exports = userCtrl;
