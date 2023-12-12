const express = require("express");
const router = express.Router();
const {editUserProfile,getAllDoctor} = require('../../controllers/userprofile.controller');

router.post('/edit-profile',editUserProfile);
router.get('/doctor', getAllDoctor);
module.exports = router;