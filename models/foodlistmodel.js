const mongoose=require('mongoose');

const foodlistSchema=mongoose.Schema({
    sellerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodmodel"
    },
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
    food_rating:{
        type:Number,
        default:0
    },
    ratingtotal:{
        type:Number,
        default:0
    },
    ratingcount:{
        type:Number,
        default:0
    },
    imgpath:{
        type:String,
        default:"uploads/1668230968407-Screenshot_20221023_043313.png"
    }

});
const foodlist=mongoose.model("foodlist",foodlistSchema);
module.exports=foodlist;