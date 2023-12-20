const express = require("express");
const router = express.Router();
const {
  checkAvailability,
  createdAppointment,
  getAppointmentList,
  patientHistory,
  changeAppointmentStatus,
  doctorHistory,
} = require("../../controllers/appointment.controller");
const tokenCheck = require("../../middleware/token-checker");

router.post("/schedule-check", checkAvailability);
router.post("/make-appointment",tokenCheck, createdAppointment);
router.get("/get-appointment-list",tokenCheck, getAppointmentList);
router.get("/patient-history", tokenCheck, patientHistory);
router.get("/doctor-history", tokenCheck, doctorHistory);
router.post("/edit-status/:id", changeAppointmentStatus);
// router.post("/change-status/:doctorId", patientCall);
// router.get("/liveupdate/:id", liveUpdate);

module.exports = router;
