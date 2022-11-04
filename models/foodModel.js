const mongoose=require("mongoose");
const foodSchema=mongoose.Schema({
    sellername:{
        type:String,
        required:true,

    },
    password:{
        type:Number,
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
        food_image:{
            
            
        }

    }],
});
const foodModel=mongoose.model("FOOD",foodSchema);

module.exports=foodModel;