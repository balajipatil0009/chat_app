const express = require('express');
const router = require('./routers/routes.js')
require("./db/conn.js")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const http = require("http").createServer(app);

const corsOptions = {
  origin: true,
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json())

// Enable CORS with options
app.use(cors(corsOptions));

const { log } = require('console');

const io = require('socket.io')(http)

const chat= require("./controllars/chat.js")

app.use('/',router);

app.use(express.static(__dirname+'/public'))

app.get('/',async(req, res)=>{
  res.sendFile(__dirname+"/public/index.html")
})

http.listen(3000,()=>{
    console.log("connected");
})

io.on('connection',chat)