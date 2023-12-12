const Profile = require("../models/Profile.model");
const editUserProfile = async (req, res)=>{
    try{
        const userData = await Profile.findOne({_id:req.body.id});
        console.log(userData)
        if(userData.role === 'doctor'){
            let available = [
                {
                    "day":req.body.sunday,
                    "time":req.body.sunday_time,
                    "hospital":req.body.sunday_hospital,
                    "patient_cheack":req.body.sunday_patient,
                },
                {
                    "day":req.body.monday,
                    "time":req.body.monday_time,
                    "hospital":req.body.monday_hospital,
                    "patient_cheack":req.body.monday_patient,
                },
                {
                    "day":req.body.tuesday,
                    "time":req.body.tuesday_time,
                    "hospital":req.body.tuesday_hospital,
                    "patient_cheack":req.body.tuesday_patient,
                },
                {
                    "day":req.body.wednesday,
                    "time":req.body.wednesday_time,
                    "hospital":req.body.wednesday_hospital,
                    "patient_cheack":req.body.wednesday_patient,
                },
                {
                    "day":req.body.thursday,
                    "time":req.body.thursday_time,
                    "hospital":req.body.thursday_hospital,
                    "patient_cheack":req.body.thursday_patient,
                },
                {
                    "day":req.body.friday,
                    "time":req.body.friday_time,
                    "hospital":req.body.friday_hospital,
                    "patient_cheack":req.body.friday_patient,
                },
                {
                    "day":req.body.saturday,
                    "time":req.body.saturday_time,
                    "hospital":req.body.saturday_hospital,
                    "patient_cheack":req.body.saturday_patient,
                },
            ];
            // if(req.file){
            //     userData.profile_img = `${process.env.BASE_URL}${req.file.destination.slice(1)}/${req.file.filename}`;
            // }
            userData.name = req.body.name;
            userData.email = req.body.email;
            userData.work_at = req.body.work_at;
            userData.specialist_on = req.body.specialist_on;
            userData.degree = req.body.degree;
            userData.NID = req.body.NID;
            userData.available = available;
        }
        if(userData.role === 'patient'){
            // if(req.file){
            //     userData.profile_img = `${process.env.BASE_URL}${req.file.destination.slice(1)}/${req.file.filename}`;
            // }
            userData.name = req.body.name;
            userData.email = req.body.email;
            userData.contact = req.body.contact;
            userData.address = req.body.address;
            userData.age = req.body.age;
        }
        await userData.save();
        res.status(200).json({'message':'updated'});
    }
    catch(error){
        res.status(500);
    }
}
const getAllDoctor = async (req,res)=>{
    try{
        const allDoctor = await Profile.find({role:'doctor'});
        res.status(200).json({
            allDoctor
        })
    }
    catch{
        res.status(500).json({
            "mgs":"Server error"
        })
    }
}
module.exports.editUserProfile = editUserProfile;
module.exports.getAllDoctor = getAllDoctor;