const mongooes = require('mongoose');

const appointment = new mongooes.Schema({
    // user_name:{
    //     type:String,
    //     required:false
    // },
    user_id:{
        type:String,
        required:true
    },
    doctor_name:{
        type:String,
        required:true
    },
    doctor_id:{
        type:String,
        required:true
    },
    specialist_on:{
        type:String,
        required:true,
    },
    patient_name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    disease:{
        type:String,
        required:true
    },
    chosen_date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    creation_date:{
        type:Date,
        default: Date.now
    }
})

module.exports = new mongooes.model('Appointment', appointment);
