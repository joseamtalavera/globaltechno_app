// routes/authRoutes.js
const express = require('express');
const authControllers = require('../Controllers/authControllers');
const router = express.Router();

router.post('/register', authControllers.registerEmail);
router.get('/emails', authControllers.getEmails);

module.exports = router;