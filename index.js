
const express = require("express");
const dbconnection = require("./dbconnect/dbconnection");
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(cors());


dbconnection();

app.use(express.json());

app.use('/user',require('./router/userRouter'));
app.get('/',(req,res)=>{
  res.send("Welcome to home screen");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {

  console.log(`Listening to the PORT ${PORT}`);
});

