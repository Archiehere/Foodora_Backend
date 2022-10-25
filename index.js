const express = require("express");
const dbconnection = require("./dbconnect/dbconnection");
const app = express();

dbconnection();

app.use(express.json());

app.use('/user',require('./router/userRouter'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening to the PORT ${PORT}`);
});
