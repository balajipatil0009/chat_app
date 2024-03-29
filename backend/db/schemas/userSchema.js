const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    socketId: {
        type: String,
        default:""
    },
    pass:{
        type: String,
        required: true
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User