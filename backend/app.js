const express = require('express');
const cookieParser = require('cookie-parser');
require("dotenv").config()

const userRouter=require('./routes/user.route.js');


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user',userRouter);



app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`);
})
