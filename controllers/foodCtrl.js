const foodModel=require("../models/foodModel");



const foodCtrl={
    register:async(req,res)=>{
        try{
            let {sellername, password,email} = req.body;
            const restaurant=foodModel({
                sellername,
                password,
                email

            });
            await restaurant.save();
            res.status(200).json({
                success:true,
                msg:"seller registered successfully !",

            })

        }
        catch(error){
            res.status(400).json({ success: false, msg: error.message });
            console.log(error);
        }
    },
    registerrestaurant:async(req,res)=>{
        try{
            const{restaurantname,restaurantdesc,id}=req.body;

            if(!id)throw new Error("login or register !");
            const result=await foodModel.findByIdAndUpdate({_id:id},{restaurantname:restaurantname,restaurantdesc:restaurantdesc},{new: true});
            console.log(result);
            
            res.status(200).json({
                success:true,
                msg:"restaurant registered successfully !",
                result

            })
        }
        catch(error){
            res.status(400).json({ success: false, msg: error.message });
            console.log(error);
        }
    },
    listfooditems:async(req,res)=>{
        try{
            const{foodname,food_price,food_desc,id}=req.body;
            if(!id)throw new Error("login or register !");
            const restaurant=await foodModel.findById(id);
            if(!restaurant)throw new Error("no such restaurant found !");
            const {food_list}=restaurant; //check if empty food_list array is obtained or not on first food item entry

            const newfoodlist=[...food_list,{foodname,food_price,food_desc}];

            const result=await foodModel.findByIdAndUpdate({_id:id},{food_list:newfoodlist},{new: true});
            console.log(result);
            
            res.status(200).json({
                success:true,
                msg:"Dish entered successfully !"
            })


        }
        catch(error){
            res.status(400).json({ success: false, msg: error.message });
            console.log(error);
        }
    }
}
module.exports=foodCtrl;