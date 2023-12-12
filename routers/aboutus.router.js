const express = require('express');
const { sendFeedback, activateFeedback, getFeedback } = require('../controllers/aboutus.controller');
const router = express.Router();

router.get('/all-feedback',getFeedback)
router.post('/feedback',sendFeedback);
router.post('/feedback-status/:id',activateFeedback);

module.exports = router;