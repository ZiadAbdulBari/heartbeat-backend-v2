const express = require("express");
const { handleWebSocketConnection } = require("../../controllers/test.controller");
const router = express.Router();

router.ws('/test-socket', handleWebSocketConnection);
module.exports = router;