const express = require('express');
const router = express.Router();
const {upload} = require('../middleware/image-handle');
const adminTokenCheck = require('../middleware/admin-token-check');
const permission = require('../middleware/permission');
const {getAllDoctor,createDoctor,updateDoctor , deleteDoctor} = require('../controllers/doctor.controller');


//doctor route
router.get('/all-doctor/:role', getAllDoctor);
// router.post('/add/doctor', createDoctor);
// router.post('/update/doctor/:id', updateDoctor);
// router.delete('/delete/doctor/:id', deleteDoctor);


module.exports = router;