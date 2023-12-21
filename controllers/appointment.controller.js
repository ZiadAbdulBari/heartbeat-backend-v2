const { compareSync } = require("bcrypt");
const Appointment = require("../models/Appointment.model");
const Auth = require("../models/Auth.model");
const Profile = require("../models/Profile.model");
const io = require("../socket");
const checkAvailability = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({
      status: 405,
      message: "Method is not allowed",
    });
  }
  try {
    const weekDays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const date = new Date(req.body.date);
    const dayNo = date.getDay();
    const day = weekDays[dayNo];
    const doctor = await Profile.findOne({ user_id: req.body.id });
    const seletedDay = doctor.available.filter((d) => d.day == day)[0];
    if (seletedDay?.day == day) {
      const patient = parseInt(seletedDay.limit);
      const totalNumberOfPatient = await Appointment.find({
        doctor_id: req.body.id,
        chosen_date: req.body.date,
      });
      if (patient == totalNumberOfPatient.length) {
        return res.status(406).json({
          status: 406,
          message: "Patient Limit has been fulfilled.",
        });
      } else {
        return res.status(200).json({
          status: 200,
          message: "Doctor is available.",
          permission: true,
          data: seletedDay,
        });
      }
    } else {
      return res.status(406).json({
        status: 406,
        message: "Doctor is not available",
      });
    }
  } catch (erroe) {
    return res.status(500).json({
      status: 500,
      message: "server error",
    });
  }
};
const createdAppointment = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({
      status: 405,
      message: "Method is not allowed",
    });
  }
  try {
    const appointment = new Appointment({
    //   user_name: req.body.user_name,
      user_id: req.id,
      doctor_name: req.body.doctor_name,
      doctor_id: req.body.doctor_id,
      specialist_on: req.body.specialist_on,
      patient_name: req.body.patient_name,
      contact: req.body.contact,
      age: req.body.age,
      disease: req.body.disease,
      status: "Pandding",
      chosen_date: req.body.chosen_date,
    });
    await appointment.save();
    return res.status(200).json({
      status: 200,
      message: "Created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
const getAppointmentList = async (req, res) => {
  if (req.method != "GET") {
    return res.status(405).json({
      status: 405,
      message: "Method is not allowed",
    });
  }
  try{
    const list = await Appointment.find({
      doctor_id: req.id,
      chosen_date: new Date(req.query.date),
    });
    return res.status(200).json({
      status:200,
      data: list,
    });
  }
  catch(error){
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
const patientHistory = async (req, res) => {
  if (req.method != "GET") {
    return res.status(405).json({
      status: 405,
      message: "Method is not allowed",
    });
  }
  try{
    let list = [];
    if(req.query.date=='false'){
      list = await Appointment.find({ patient_id: req.id });
    }
    else if(req.query.date!='false'){
      list = await Appointment.find({ patient_id: req.id, chosen_date:req.query.date });
    }
    return res.status(200).json({ 
      status:200,
      list 
    });

  }
  catch(error){
    return res.status(500).json({
      status:500,
      message:error
    })
  }
};
const doctorHistory = async (req, res) => {
  if (req.method != "GET") {
    return res.status(405).json({
      status: 405,
      message: "Method is not allowed",
    });
  }
  try{
    let list = [];
    if(req.query.date=='false'){
      list = await Appointment.find({ doctor_id: req.id });
    }
    else if(req.query.date!='false'){
      list = await Appointment.find({ doctor_id: req.id,chosen_date:req.query.date });
    }
    return res.status(200).json({ 
      status:200,
      list 
    });

  }
  catch(error){
    return res.status(500).json({
      status:500,
      message:error
    })
  }
};
const changeAppointmentStatus = async (req, res) => {
  try {
    const list = await Appointment.findOne({ _id: req.body.id });
    if (
      list.status == "completed" ||
      list.status == "Completed" ||
      list.status == "cancel" ||
      list.status == "Cancel"
    ) {
      return res.status(200).json({
        status:200,
        message: "Can't change the status",
      });
    }
    console.log("chole ashche");
    list.status = req.body.status;
    const callingPatient = await list.save();
    return res.status(200).json({
      status:200,
      message: "Status changed successfully",
      data:callingPatient
    });
  } catch (error) {
    return res.status(500).json({
      status:500,
      message: error,
    });
  }
};
module.exports.checkAvailability = checkAvailability;
module.exports.createdAppointment = createdAppointment;
module.exports.getAppointmentList = getAppointmentList;
module.exports.patientHistory = patientHistory;
module.exports.doctorHistory = doctorHistory;
module.exports.changeAppointmentStatus = changeAppointmentStatus;
