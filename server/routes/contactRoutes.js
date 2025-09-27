const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Send contact form message
router.post('/', contactController.sendContactMessage);

module.exports = router;