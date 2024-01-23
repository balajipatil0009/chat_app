const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({

    members:[
        {
            type: String,    
            required: true,
            ref:"User"
        }
    ],
    chats:[{
        from: {
            type: String,
            ref: "User"
        },
        to: {
            type: String,
            ref: "User"
        },
        msg:{
            type: String,
            required: true
        },
        timestamp:{
            type: Date,
            default: Date.now
        }
    }],
    groupChat:{
        type: Boolean,
        default: false
    },
    groupName:{
        type: String,
        unique: true,
        default:""
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.model("Chat",chatSchema)

module.exports = Chat;
