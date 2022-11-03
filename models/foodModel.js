const mongoose=require("mongoose");
 
const foodSchema=mongoose.Schema({
    restaurentname:{
        type:String,
        required:true,
        unique:true,
    },
    restaurentdesc:{
        type:String,
        required:true,
        unique:true
    },
    food_list:[{
        foodname:{
            type:String,
            required:true,
            unique:true,
        },
        food_price:{
            required:Number,
            required:true,
        },
        food_desc:{
            type:String,
            required:true,
        }

    }],




});
const foodModel=mongoose.model("FOOD",foodSchema);

module.exports=foodModel;