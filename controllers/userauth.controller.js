const Auth = require("../models/Auth.model");
const Profile = require('../models/Profile.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: "405",
        mgs: "method not allowed",
      });
    }
    const email_check = await Auth.findOne({ email: req.body.email });
    if (email_check) {
      return res.status(409).json({
        status: 409,
        mgs: "Try another email",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    let user = new Auth({
      name: req.body.name,
      email: req.body.email,
      password: password,
      role: req.body.role,
    });
    const newUser = await user.save();
    let createProfile = new Profile({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      user_id:newUser._id,
    })
    await createProfile.save();
    return res.status(200).json({
      status: 200,
      message: "successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "server error",
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const checkEmail = await Auth.find({ email: email });
    if (checkEmail.length > 0) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkEmail[0].password
      );
      if (checkPassword) {
        const token = jwt.sign(
          {
            id: checkEmail[0]._id,
            email: checkEmail[0].email,
            role: checkEmail[0].role,
          },
          process.env.JWT_TOKEN
        );
        return res.status(200).json({
          status:200,
          access_token: token,
          user_id:checkEmail[0]._id,
          role:checkEmail[0].role,
          mgs: "logged in",
        });
      } else {
        return res.status(401).json({
          status:401,
          mgs: "Failed",
        });
      }
    } else {
      return res.status(401).json({
        status:401,
        mgs: "Authentication failed",
      });
    }
  } catch {
    return res.status(500).json({
      status:500,
      mgs: "Server error",
    });
  }
};
module.exports.userRegistration = userRegistration;
module.exports.userLogin = userLogin;