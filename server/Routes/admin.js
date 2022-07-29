const AdminController = require("../controllers/admin-controller");
const express = require("express");
const auth = require("../Middleware/auth");
const { User, Hotel } = require("../models/Schema");

const router = express.Router();
//////////////////hotel//////////////////
router.post("/add-hotel", auth, AdminController.addHotel);
router.post(
  "/assign-hotel-admin/:hotelId/:hotelAdmin",
  auth,
  AdminController.assignHotelAdmin
);
router.post(
  "/assign-hotels-around/:hotelId/:attractionId",
  auth,
  AdminController.assignHoteHotelAround
);
router.post("/update-hotel/:hotelId", auth, AdminController.updateHotel);
router.post("/delete-hotel/:hotelId", auth, AdminController.deleteHotel);
////////////hotel admin///////////////////
router.post("/add-hotel-admin", auth, AdminController.addHotelAdmin);
router.post(
  "/update-hotel-admin/:userId",
  auth,
  AdminController.updateHotelAdmin
);
router.post(
  "/delete-hotel-admin/:userId",
  auth,
  AdminController.deleteHotelAdmin
);
/////////////AttractionSiteType/////////////////////////////////
router.post(
  "/add-attraction-site-type",
  auth,
  AdminController.addAttractionSiteType
);
router.post(
  "/delete-attraction-site-type/:Id",
  auth,
  AdminController.deleteAttractionSiteType
);
router.post(
  "/update-attraction-site-type/:Id",
  auth,
  AdminController.updateAttractionSiteType
);
///////////////AttractionSite///////////////////////////
router.post("/add-attraction-site", auth, AdminController.addAttractionSite);
router.post(
  "/delete-attraction-site/:Id",
  auth,
  AdminController.deleteAttractionSite
);
router.post(
  "/update-attraction-site/:Id",
  auth,
  AdminController.updateAttractionSiteType
);
///////////////see users///////////////////////////
router.get("/get-users", auth, AdminController.getUsers);
router.get("/get-get-hotels", auth, AdminController.getUsers);
router.get("/get-get-hotels", auth, AdminController.getUsers);
router.get("/get-feedback", auth, AdminController.getFeedback);
////////////////////////count///////////////////////////////
router.get("/get-user-count", auth, AdminController.getUserCount);
router.get("/get-hotel-count", auth, AdminController.getHotelCount);
router.get(
  "/get-attraction-area-count",
  auth,
  AdminController.getAttractionSiteCount
);
router.get("/get-hotel-admin-count", auth, AdminController.getHotelAdminCount);

router.get("/get-hotel-admin", async (req, res) => {
  const HotelAdmins = await User.findAll({
    where: {
      RoleId: 2,
    },
  });

  res.send(HotelAdmins);
});

router.post("/add-region", auth, AdminController.addRegion);
router.get("/get-counts", auth, AdminController.getCounts);

module.exports = router;
