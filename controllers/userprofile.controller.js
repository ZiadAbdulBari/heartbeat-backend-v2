const Profile = require("../models/Profile.model");
const getUserProfile = async (req,res)=>{
    try{
        const profile = await Profile.findOne({user_id:req.id});
        return res.status(200).json({
            status:200,
            data:profile
        })
    }
    catch(error){
        return res.status(500).json({
            status:500,
            "error":error
        })
    }
}
const editUserProfile = async (req, res)=>{
    try{
        const userData = await Profile.findOne({user_id:req.id});
        // console.log(userData)
        if(req.role === 'doctor'){
            // pm
            // if(req.file){
            //     userData.profile_img = `${process.env.BASE_URL}${req.file.destination.slice(1)}/${req.file.filename}`;
            // }
            userData.name = req.body.name;
            userData.email = req.body.email;
            userData.contact = req.body.contact;
            userData.work_at = req.body.work_at;
            userData.specialist_on = req.body.specialist_on;
            userData.degree = req.body.degree;
            userData.NID = req.body.NID;
            userData.available = req.body.available;
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
        return res.status(200).json({
            status:200,
            message:"Profile successfully updated."
        });
    }
    catch(error){
        res.status(500).json({
            status:500,
            message:error
        });
    }
}
const getAllDoctor = async (req,res)=>{
    try{
        const allDoctor = await Profile.find({role:'doctor'});
        return res.status(200).json({
            status:200,
            data:allDoctor
        })
    }
    catch(error){
        return res.status(500).json({
            status:500,
            "error":error
        })
    }
}
module.exports.getUserProfile = getUserProfile;
module.exports.editUserProfile = editUserProfile;
module.exports.getAllDoctor = getAllDoctor;