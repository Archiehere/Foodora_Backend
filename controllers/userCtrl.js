const UserModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const e = require("express");
const otpGenerator = require("otp-generator");
const sellerModel = require("../models/foodModel");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "foodorafoodservice@gmail.com",
    pass: process.env.password,
  },
});
const userCtrl = {
  register: async (req, res) => {
    try {
      let { username, email, password } = req.body;
      email = email.toLowerCase();
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
          verify: false,
        });
        await user.save();

        const userotp = otpModel({
          createdAt: new Date(),
          email,
        });

        userotp.otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        await userotp.save();

        const mailoptions = {
          from: "foodorafoodservice@gmail.com",
          to: email,
          subject: "Foodora Verification OTP",
          html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the Gates of Foodora.</h2>
          <h4>You are About to be a Member </h4>
          <p style="margin-bottom: 30px;">Please enter this sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${userotp.otp}</h1>
     </div>
      `,
        };
        transporter.sendMail(mailoptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("mail sent");
          }
        });


        const accesstoken = createAccessToken({ id: user._id });
        const refreshtoken = createRefreshToken({ id: user._id });

        res.cookie("refreshtoken", refreshtoken, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, //7d
        });
        res.status(200).json({
          success: true,
          msg: "OTP sent",
          accesstoken
        });


      } else {
        res.status(400).json({ success: false, msg: "User already exists!" });
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
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
      if (!user.verify) throw new Error("User Not Verified");
      const result = await bcrypt.compare(password, user.password);
      if (!result) throw new Error("Invalid credentials!");


      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7d
      });
      

      res.status(200).json({
        success: true,
        msg: "Login successful",
        accesstoken
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  },
  sendOTP: async (req, res) => {
    try {
      // console.log(req.route.path);
      const { email } = req.body;

      const user = await UserModel.findOne({ email });
      const userotp = await otpModel.findOne({ email });
      if (!userotp) {
        const userotp = otpModel({
          createdAt: new Date(),
          email,
          otp: null,
        });
        await userotp.save();
        userotp.otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        await userotp.save();
      }
      if (!user) throw new Error("No user found!");
      if (user.verify) throw new Error("User already verified");
      if(userotp){
      userotp.otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      await userotp.save();

      const mailoptions = {
        from: "foodorafoodservice@gmail.com",
        to: email,
        subject: "Foodora Verification OTP",
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the Gates of Foodora.</h2>
          <h4>You are About to be a Member </h4>
          <p style="margin-bottom: 30px;">Please enter this sign up OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${userotp.otp}</h1>
     </div>
      `,
      };
      transporter.sendMail(mailoptions, (err, info) => {
        if (err) {
          console.log(err);
          throw new Error("Mail not sent");
        } else {
          console.log("mail sent");
        }
      });
    }
      res.status(200).json({
        success: true,
        msg: "mail sent",
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  },
  forgotsendOTP: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await UserModel.findOne({ email });
      const userotpold = await otpModel.findOne({ email });

      if (userotpold && userotpold.verify) throw Error("User Already Verified");
      //  userotp.deleteOne();
      // otpModel.deleteOne({ email });
      if (!user) throw new Error("User does not exist");
      if (!user.verify) throw new Error("User Not verified.");

      // if(userotp.verify) throw new Error("Forgot password verification already completed")
      let userotp,users;
      if (!userotpold) {
        userotp = otpModel({
          createdAt: new Date(),
          email,
          verify: false,
          // otp: null,
        });
        await userotp.save();
        userotp.otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        await userotp.save();
        users=userotp;
      } else {
        // console.log(userotp);
        userotpold.otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          specialChars: false,
          lowerCaseAlphabets: false,
        });
        await userotpold.save();
        users=userotpold;
      }
      const mailoptions = {
        from: "foodorafoodservice@gmail.com",
        to: email,
        subject: "Foodora Verification OTP",
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome to the Gates of Foodora.</h2>
          <h4>Forgot Password? </h4>
          <p style="margin-bottom: 30px;">Please enter this OTP to Reset Password</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${users.otp}</h1>
     </div>
      `,
      };
      transporter.sendMail(mailoptions, (err, info) => {
        if (err) {
          console.log(err);
          throw new Error("Mail not sent");
        } else {
          console.log("mail sent");
        }
      });
      res.status(200).json({
        success: true,
        msg: "mail sent",
      });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  },
  forgotverify: async (req, res) => {
    try {
      // console.log(req.route.path);
      const { email, otp } = req.body;
      const user = await UserModel.findOne({ email });
      const userotp = await otpModel.findOne({ email });
      if (!userotp) throw new Error("OTP timed out.");
      if (!user) throw new Error("No user found!");
      if (userotp.verify) throw new Error("User already verified");
      if (userotp.otp == otp) {
        userotp.verify = true;
        userotp.otp = null;
        userotp.save();

        res.status(200).json({
          success: true,
          msg: "user verified",
        });
      } else res.status(400).json({ success: false, msg: "OTP incorrect" });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  },
  resetpass: async (req, res) => {
    try {
      // console.log(req.route.path);
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const userotp = await otpModel.findOne({ email });
      if (!userotp) throw new Error("Verification Timed OUT");
      if (!user) throw new Error("No user found!");

      if (userotp.verify == true) {
        const result = await bcrypt.compare(password, user.password);
        if (result) throw new Error("Please Change to new Password");
        const passwordHash = await bcrypt.hash(password, 12);
        user.password = passwordHash;
        user.save();
        userotp.verify = false;
        userotp.save();

        res.status(200).json({
          success: true,
          msg: "password changed successfully",
        });
      } else
        res
          .status(400)
          .json({ success: false, msg: "OTP verification Incomplete" });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  },
  verify: async (req, res) => {
    try {
      // console.log(req.route.path);
      const { email, otp } = req.body;
      const user = await UserModel.findOne({ email });
      const userotp = await otpModel.findOne({ email });
      if (!userotp) throw new Error("OTP timed out.");
      if (!user) throw new Error("No user found!");
      if (user.verify) throw new Error("User already verified");
      if (userotp.otp == otp) {
        user.verify = true;
        user.save();
        userotp.otp = null;
        userotp.save();
        const mailoptions = {
          from: "foodorafoodservice@gmail.com",
          to: email,
          subject:
            "Dear Customer, sign up to your foodora account is successfull !",
          html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px; "
        >
          <h2>Welcome to the club. ${user.username}</h2>
          <h4>You are hereby declared a member of Foodora.</h4>
          <p style="margin-bottom: 30px;">We are really happy to welcome you to our growing family of food lovers. Thank you for showing your interest in our services.</p>
     </div>
      `,
        };
        transporter.sendMail(mailoptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("mail sent");
          }
        });
        res.status(200).json({
          success: true,
          msg: "user verified",
        });
      } else res.status(400).json({ success: false, msg: "OTP incorrect" });
    } catch (error) {
      res.status(400).json({ success: false, msg: error.message });
      console.log(error);
    }
  },


  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken",{path:'/user/refresh_token'})
      return res.json({msg:"Logged Out"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  userprofile:async(req,res)=>{
    try{
      const id=req.body;
      console.log(id);
      if(!id)throw new Error("No user exists !")
      const userDetails=await UserModel.findById(id);
      const username=userDetails.username
      const emailid=userDetails.email

      res.status(200).json({
        success: true,
        msg: "user details sent successfully !",
        username,
        emailid

      })


    }
    catch (err){
        return res.status(400).json({msg:err.message});
    }
  },
  addtocart:async(req,res)=>{
    try{
      const{seller_id,food_id,user_id}=req.body;
      const fooddetails=await sellerModel.findById(seller_id);
      const{food_list}=fooddetails;
      let cartfoodlist;
      food_list.forEach(foodlist=>{
        if(foodlist._id==food_id)
        {
          cartfoodlist=foodlist;
        }
      })
      const foodname=cartfoodlist.foodname;
      const food_price=cartfoodlist.food_price;

      const users=await UserModel.findById(user_id);
      const {cart}=users;
      let cartinfotemp=null;
      cart.forEach(cartinfo=>{
        if(cartinfo.foodname==foodname)
        {
          cartinfotemp=cartinfo;
        }
        
      })
      console.log(cartinfotemp);
      if(cartinfotemp!=null)
      {
        cartinfotemp.quantity++;
      }
      else{
      var quantity=0
      const newcart=[...cart,{foodname,food_price,quantity}];

      const result=await UserModel.findByIdAndUpdate({_id:user_id},{cart:newcart},{new: true});
      console.log(result);
      }
    }
    catch(err){
      return res.status(400).json({ msg: err.message });
    }
  },
  feed:async(req,res)=>{
    try{
      
    }
    catch(err){
      return res.status(400).json({ msg: err.message });
    }
  }
}


const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};


module.exports = userCtrl;