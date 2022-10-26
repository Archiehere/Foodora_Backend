const express = require("express");
const dbconnection = require("./dbconnect/dbconnection");
require('dotenv').config();
const app = express();

dbconnection();

app.use(express.json());

app.use('/user',require('./router/userRouter'));

const PORT = process.env.PORT;
app.listen(PORT, () => {

  console.log(`Listening to the PORT ${PORT}`);
});

