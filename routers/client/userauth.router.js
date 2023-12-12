const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
} = require("../../controllers/userauth.controller");

router.post("/registration", userRegistration);
router.post("/login", userLogin);
module.exports = router;
