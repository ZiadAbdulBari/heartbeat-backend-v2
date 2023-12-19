const express = require("express");
const router = express.Router();
const {getUserProfile,editUserProfile,getAllDoctor} = require('../../controllers/userprofile.controller');
const tokenCheck = require("../../middleware/token-checker");

router.post('/edit-profile',tokenCheck,editUserProfile);
router.get('/profile-data',tokenCheck,getUserProfile);
router.get('/doctor', getAllDoctor);
module.exports = router;