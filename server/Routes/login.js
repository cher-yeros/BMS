const express = require("express");
const LoginController = require("../controllers/login-controller");

const router = express.Router();

router.post("/", LoginController.login);
router.post("/receptionistLogin", LoginController.receptionistLogin);
// router.post('/hotelAdmin', LoginController.hotelAdmin);
// router.post('/farmer', LoginController.farmer);
// router.post('/admin', LoginController.admin);

module.exports = router;
