const { genSaltSync } = require("bcrypt");
const foodModel=require("../models/foodModel");


const foodCtrl={
    registerrestaurent:async(req,res)=>{
        try{
            let{restaurentname,restaurentdesc}=req.body;
            const restaurent=foodModel({
                restaurentname,
                restaurentdesc
            });
            await restaurent.save;

            res.ststus(200).json({
                success:true,
                msg:"restaurent reistered successfully !",
            })
        }
        catch{
            res.status(400).json({ success: false, msg: error.message });
            console.log(error);
        }
    },
}