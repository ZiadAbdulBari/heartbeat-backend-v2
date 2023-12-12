const mongoose = require("mongoose");

const profile = new mongoose.Schema({
    name:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:false,
        unique:true,
    },
    work_at:{
        type: String,
        required: false
    },
    specialist_on:{
        type: String,
        required: false
    },
    degree:{
        type: Array,
        required: false
    },
    NID:{
        type: String,
        required: false
    },
    available:{
        type: Array,
        required: false
    },
    contact:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    age:{
        type: String,
        required: false
    },
    role:{
        type: String,
        required: false
    },
}) 

module.exports = new mongoose.model('Profile',profile);