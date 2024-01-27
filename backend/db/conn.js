require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.DB_uri;
mongoose.connect(url).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e);
})



