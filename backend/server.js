const express = require('express');
// const { Socket } = require('socket.io');
const app = express()
const http = require("http").createServer(app);
const User = require('./db/schemas/User.js')

// const {database} = require('./db/conn.js')
const conn = require('./db/conn.js')

conn();
const io = require('socket.io')(http)

app.get('/',async(req, res)=>{
  res.sendFile(__dirname+"/public/index.html")
})

app.use(express.static(__dirname+'/public'))

http.listen(3000,()=>{
    console.log("connected");
})








io.on('connection',async(Socket)=>{
    console.log("conected....")
    Socket.on('auth',async(userID)=>{
         console.log(userID);
         let conns =  await conn();
        const user = new User({userID, socketID: Socket.id});
        // const collection = db.collection(balaji);
        
        try{

            const saved = await user.save()
            if(saved){
                console.log("babu"+saved.socketID);
            }
        }catch(e){
            console.log("catch:"+ e);
        }
    })

    Socket.on('massage', async(msg)=>{
        console.log(msg)
        Socket.broadcast.emit('massage',msg)
    })
    
    //to just have user id
    Socket.on('privateMasssage',({to, msg})=>{
        console.log(to);
       redisClint.hGet('connecteduser',to,(err, userString)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(userString);
        }

        const rescpt = JSON.parse(userString)

        if(rescpt){
            console.log(rescpt);
        }

       })
         console.log(toUser);
         if(toUser){
            Socket.to(toUser).emit('masssage', msg)
         }
    })
})