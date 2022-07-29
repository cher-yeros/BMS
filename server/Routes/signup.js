const express = require('express');
const SignupController = require('../controllers/signup-controller');

const router = express.Router();

router.post('/hotelAdmin', SignupController.hotelAdmin);





module.exports = router;