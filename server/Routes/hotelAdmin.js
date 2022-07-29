const hotelAdminController = require("../controllers/hotel-admin-controller");
const express = require("express");
const auth = require("../Middleware/auth");

const router = express.Router();
//////////////////hotel//////////////////
router.post("/update-hotel", auth, hotelAdminController.updateHotel);
router.get("/get-hotel/:userId", auth, hotelAdminController.getHotel);
///////////////////////room//////////////////////////////////
router.get("/get-room/:hotelId", auth, hotelAdminController.getRoom);
router.post("/add-room/:hotelId", auth, hotelAdminController.addRoom);
router.post("/delete-room/:roomId", auth, hotelAdminController.deleteRoom);
///////////////////////////food///////////////////////////////////////////
router.get("/get-food/:hotelId", auth, hotelAdminController.getFood);
router.post("/add-food/:hotelId", auth, hotelAdminController.addFood);
router.post("/delete-food/:foodId", auth, hotelAdminController.deleteFood);
/////////////////////////see list of booked rooms/////////////////////////
router.get("/get-booked-room/:hotelId", auth, hotelAdminController.getRoom);
/////////////////////////////Receptionist/////////////////////////////////
router.post("/add-receptionist", auth, hotelAdminController.addR);
router.post(
  "/receptionist/get-hotel/:hotelId",
  auth,
  hotelAdminController.getRecepHotel
);
module.exports = router;
