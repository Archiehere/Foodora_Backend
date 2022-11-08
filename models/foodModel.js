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
        
        unique:true,
        default:""
    },
    restaurantaddress:{
        type:String,
        unique:true,
        default:""
    },
    restaurantdesc:{
        type:String,
        unique:true,
        default:""

    },
    restaurant_openingtime:{
        type:String,
        default:""
    },
    restaurant_closingtime:{
        type:String,
        default:""
    },
    verify:{
        type:Boolean,
        required:false,
      },
    food_list:[{
        foodname:{
            type:String,
            
            unique:true,
        },
        food_price:{

            type:Number,
            
        },
        food_desc:{
            type:String,
            
        },
        imgpath:{
            type:String,
            
            
        }

    }],
});
const foodModel=mongoose.model("SELLER",foodSchema);

module.exports=foodModel;