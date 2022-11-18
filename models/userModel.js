const mongoose = require("mongoose");
// const foodModel=require("foodModel");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileimgpath:{
    type:String,
    default:"uploads/1668230968407-Screenshot_20221023_043313.png"
  },
  password: {
    type: String,
    required: true,
  },
  username:{
    type:String,
    required:true,
  },
  // orderhistory:{
  //   type:Array,
  //   default:[]
  // },
  otp:{
    type:String,
    required:false,
  },
  verify:{
    type:Boolean,
    required:false,
  },
  nearme:{
    type:Array,
    default:[]
  },
  address:{
    type:String,
  },
  sellerid:{
    type:String,
    default:""
  },
  cart:[{
    foodid:{
      type:mongoose.Schema.Types.ObjectId,
    },
    foodname:{
        type:String,
        // unique:true,
    },
    food_price:{

        type:Number,
        
    },
    quantity:{
      type:Number,
      default:null
    },
    rating:{
      type:Number,
      default:0
    }
   
}],
  
  
  // contact:{
  //   type:String,
  //   required:true
  // },
  // address:{
  //   type:String
  // }
});

const UserModel = mongoose.model("USER",userSchema);

module.exports=UserModel;
