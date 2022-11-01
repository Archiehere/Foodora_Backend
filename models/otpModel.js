const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp:{
    type:String,
    required:false,
  },
  verify:{
    type:Boolean,
    required:false,
  },
  "createdAt":{
    type:Date,
  },
  
  // contact:{
  //   type:String,
  //   required:true
  // },
  // address:{
  //   type:String
  // }
});

const otpModel = mongoose.model("TEMP",otpSchema);

module.exports=otpModel;
