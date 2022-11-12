const mongoose = require("mongoose");
// const foodModel=require("foodModel");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username:{
    type:String,
    required:true,
  },
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
  sellerid:{
    type:String,
    default:""
  },
  cart:[{
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
  orderhistory:[{
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
  }]

  
  
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
