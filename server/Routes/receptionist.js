const customerController = require('../controllers/receptionist-controller');
const express = require('express');
const auth = require('../Middleware/auth');

const router = express.Router();

router.get('/get-available-room',auth, customerController.getAvailableRoom);
router.get('/see-allocated-room',auth, customerController.getAllocatedRoom);


module.exports = router;