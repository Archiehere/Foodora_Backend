const mongoose = require("mongoose");

const dbconnection = async() => {
  try {
    await mongoose.connect("mongodb+srv://Anshuman:Anshuman2003@cluster0.fnytrhq.mongodb.net/?retryWrites=true&w=majority", () => {
      console.log("db connection successful");
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = dbconnection;
