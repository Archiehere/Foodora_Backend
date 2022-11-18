const mongoose=require("mongoose");
const foodSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    restaurantname:{
        type:String,
        
        // unique:true,
        // default:""
    },
    mobilenumber:{
        type:String,
        // unique:true,
        // required:false,
        // default:""
    },
    restaurantaddress:{
        type:String,
        // unique:true,
        // default:""
    },
    
    restaurant_openingtime:{
        type:String,
        default:""
    },
    restaurant_closingtime:{
        type:String,
        default:""
    },
    imgpath:{
        type:Array,
        default:"uploads/1668230968407-Screenshot_20221023_043313.png"
    },
    state:{
        type:String,
        default:""
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    },
    verify:{
        type:Boolean,
        required:false,
      },
    // orders:{
    //     type:Array,
    // },
    food_list:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"foodlist"

    }],
});
const foodModel=mongoose.model("sellers",foodSchema);

module.exports=foodModel;
