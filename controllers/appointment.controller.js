const { compareSync } = require("bcrypt");
const Appointment = require("../models/Appointment.model");
const Auth = require("../models/Auth.model");
const Profile = require("../models/Profile.model");
const checkAvailability = async (req,res)=>{
    if(req.method!='POST'){
        return res.status(405).json({
            "status":405,
            "mgs":"method not allowed"
        })
    }
    try{
        const weekDays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
        const date = new Date(req.body.date);
        const dayNo = date.getDay();
        const day = weekDays[dayNo];
        const doctor = await Profile.findOne({_id:req.params.id});
        if(doctor.available[dayNo].day==day){
            const patient = parseInt(doctor.available[dayNo].patient_cheack);
            const totalNumberOfPatient = await Appointment.find({doctor_id:req.params.id, chosen_date:req.body.date});
            if(patient==totalNumberOfPatient.length){
                return res.status(200).json({
                    "status":200,
                    "mgs":"Patient Limit has been fulfilled.",
                })
            }
            else{
                res.status(200).json({
                    "status":200,
                    "mgs":"Doctor is available.",
                    "permission":true,
                    "data":doctor.available[dayNo],
                })
                
            }
        }
        else{
            res.status(200).json({
                "status":200,
                "mgs":"Doctor is not available",
            })
        }

    }
    catch(erroe){
        res.status(500).json({
            "status":500,
            "mgs":"server error"
        })
    }
}
const createdAppointment = async(req, res)=>{
    const {error} = createAppointmentValidation(req.body);
    if(error){
        res.status(400).json({
            'mgs':error,
        })
    }
    const appointment = new Appointment({
        user_name: req.body.user_name,
        doctor_name: req.body.doctor_name,
        doctor_id: req.body.doctor_id,
        specialished_on: req.body.specialished_on,
        patient_name: req.body.patient_name,
        patient_id: req.body.patient_id,
        contact: req.body.contact,
        age: req.body.age,
        disease: req.body.disease,
        status:'Pandding',
        chosen_date: req.body.chosen_date,
    })

    try{
        await appointment.save();
        res.status(200).json({
            "status": 200,
            "mgs":"created",
        })
    }
    catch(error){
        res.status(500).json({
            "status": 500,
            "mgs":error,
        })
    }
}
const getAppointmentList = async(req,res)=>{
    if(req.method=='get' || req.method=='GET'){
        const list = await Appointment.find({doctor_id: req.params.id,chosen_date:req.query.date});
        res.status(200).json({
            "data":list,
        })
    }
    else{
        res.status(405).json({
            "status":405,
            "mgs":"method not allowed"
        })
    }
}
const patientHistory = async(req,res)=>{
    if(req.method=='get' ||req.method=='GET'){
        const list = await Appointment.find({patient_id: req.id});
        res.status(200).json({list})
    }
    else{
        res.status(500);
    }
}
const changeAppointmentStatus = async(req,res)=>{
    try{
        const list = await Appointment.findOne({_id:req.params.id});
        if((list.status=='completed' || list.status=='Completed') || (list.status=='cancel' || list.status=='Cancel')){
            res.status(200).json({
                "mgs":"can't change the status",
            })
        }
        console.log("chole ashche");
        list.status = req.body.status;
        await list.save();
        res.status(200).json({
            "mgs":"ststus changed successfully",
        })
    }
    catch(error){
        res.status(500).json({
            "mgs":"Server error",
        })
    }
}
module.exports.checkAvailability = checkAvailability;
module.exports.createdAppointment = createdAppointment;
module.exports.getAppointmentList = getAppointmentList;
module.exports.patientHistory = patientHistory;
module.exports.changeAppointmentStatus = changeAppointmentStatus;