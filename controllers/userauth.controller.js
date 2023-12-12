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
    let createProfile = new Profile({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    })
    await createProfile.save();
    await user.save();
    return res.status(200).json({
      status: 200,
      mgs: "successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      mgs: "server error",
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
        res.status(200).json({
          access_token: token,
          mgs: "logged in",
        });
      } else {
        res.status(401).json({
          mgs: "Failed",
        });
      }
    } else {
      res.status(401).json({
        mgs: "Authentication failed",
      });
    }
  } catch {
    res.status(500).json({
      mgs: "Server error",
    });
  }
};
module.exports.userRegistration = userRegistration;
module.exports.userLogin = userLogin;