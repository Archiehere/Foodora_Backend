const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  order:{
    type:Array
  },
  userid:{
    type:mongoose.Types.ObjectId
  },
  sellerid:{
    type:mongoose.Types.ObjectId
  },
  status:{
    type:String,
    default:"Pending"
  }
});

const orderModel = mongoose.model("order",orderSchema);

module.exports=orderModel;
