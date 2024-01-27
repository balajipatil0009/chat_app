const User = require('../db/schemas/userSchema')
const resister = async(req, res) => {
     console.log(req.body);
     if(req.body.email && req.body.pass){
     const existUser = await User.findOne({userId: req.body.email})
     if(!existUser){
        const newUser = new User({userId: req.body.email, pass: req.body.pass})
        try{
               await newUser.save().then(()=>{
                   res.status(200).json({massage:"user resistered successfully"})
               })
        }catch(e){
           console.log(e);
           res.status(500).json({error:"An error accured"})
        }
     }else{
        res.status(200).json({error:"User already exist"})
     }
    }
}

module.exports = {resister}