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
        required:false,
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
    food_list:[{
        foodname:{
            type:String,
            
            // unique:true,   
        },
        food_price:{

            type:Number,
            
        },
        food_desc:{
            type:String,
            
        },
        food_category:{
            type:String,
        },
        imgpath:{
            type:String,
        }

    }],
});
const foodModel=mongoose.model("SELLER",foodSchema);

module.exports=foodModel;