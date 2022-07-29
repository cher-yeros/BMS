const customerController = require("../controllers/customer-controller");
const express = require("express");
const auth = require("../Middleware/auth");

const router = express.Router();

router.post("/book-room/:roomId/:userId", auth, customerController.bookRoom);
router.get("/get-attraction-site", customerController.getAttractionSite);
router.get("/get-region", customerController.getRegion);
router.get("/get-hotels", customerController.getHotel);
router.post(
  "/give-feedback-to-hotel/:HotelId",
  auth,
  customerController.giveFeedbackToHotel
);
// router.post('/give-feedback-to-Attraction-site/:id',auth, customerController.giveFeedbackToAttraction);
// router.post('/get-near-by-hotel',auth, customerController.addRoom);
router.post("/search-hotels", auth, customerController.searchHotel);
router.post("/search-attraction-site", customerController.searchAttractionSite);
router.get(
  "/get-hotels-around/:attractionId",
  customerController.getHotelsAround
);

module.exports = router;
