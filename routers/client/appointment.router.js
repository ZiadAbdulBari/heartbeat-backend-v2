const express = require("express");
const router = express.Router();
const {
  checkAvailability,
  createdAppointment,
  getAppointmentList,
  patientHistory,
  changeAppointmentStatus,
} = require("../../controllers/appointment.controller");
const tokenCheck = require("../../middleware/token-checker");

router.post("/schedule-check/:id", checkAvailability);
router.post("/make-appointment", createdAppointment);
router.get("/get-appointment-list/:id", getAppointmentList);
router.get("/patient-history", patientHistory);
router.post("/edit-status/:id", changeAppointmentStatus);
// router.post("/change-status/:doctorId", patientCall);
// router.get("/liveupdate/:id", liveUpdate);

module.exports = router;
