const mongoose = require("mongoose");

const auth = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        required: true
    },
    joined_at:{
        type: Date,
        default: Date.now
    }
}) 

module.exports = new mongoose.model('Auth',auth);
