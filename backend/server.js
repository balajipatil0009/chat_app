const express = require('express');
require("./db/conn.js")
const app = express()

const http = require("http").createServer(app);

const { log } = require('console');

const io = require('socket.io')(http)

const chat= require("./routers/chat.js")
app.use(express.static(__dirname+'/public'))
app.get('/',async(req, res)=>{
  res.sendFile(__dirname+"/public/index.html")
})

app.get('/groups',async(req, res)=>{
  res.sendFile(__dirname+"/public/group.html")
})

http.listen(3000,()=>{
    console.log("connected");
})

io.on('connection',chat)