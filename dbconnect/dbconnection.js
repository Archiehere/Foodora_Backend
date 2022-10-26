const mongoose = require("mongoose");

const dbconnection = async() => {
  try {
    await mongoose.connect("mongodb+srv://Archas:qSBugbIZd6qOmyh6@cluster0.pg6nfmw.mongodb.net/?retryWrites=true&w=majority", () => {
      console.log("db connection successful");
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = dbconnection;
