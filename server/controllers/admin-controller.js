const { Op } = require("Sequelize");

const models = require("../models/Schema");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = {
  async addHotel(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    console.log(req.headers);

    if (!req.files) {
      res.send({ success: false, message: "No files uploaded" });
    } else {
      try {
        const hotel = await models.Hotel.create(body);

        var files = [];
        var fileKeys = Object.keys(req.files);

        fileKeys.forEach(function (key) {
          files.push(req.files[key]);
        });

        files.forEach((image, i) => {
          image.mv("Photos/Hotels/" + hotel.Id + i + ".jpg", function (err) {
            if (err) return res.send(err);
          });
        });

        res.send({ success: true, hotel });
      } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Server Error" });
      }
    }
  },
  ///////////////////////////////////////////
  async addHotelAdmin(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      body.RoleId = 2;
      const salt = await bcrypt.genSalt(10);
      body.Password = await bcrypt.hash(body.Password, salt);
      const hotelAdmin = await models.User.create(body);
      return res.status(200).send({
        success: true,
        message: hotelAdmin,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////////
  async assignHotelAdmin(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });

    const ha = await models.Hotel.findOne({
      where: {
        hotelAdmin: req.params.hotelAdmin,
      },
    });
    if (ha) {
      res.send({ success: false, message: "Admin Already Assigned" });
    } else {
      try {
        const yes = await models.Hotel.update(
          { hotelAdmin: req.params.hotelAdmin },
          {
            where: {
              Id: req.params.hotelId,
            },
          }
        );
        res.send({ success: yes[0] ? true : false });
      } catch (err) {
        console.log(err);
        return res.status(200).send({
          success: false,
        });
      }
    }
  },
  async assignHoteHotelAround(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });

    const hotel = await models.Hotel.findOne({
      where: {
        Id: req.params.hotelId,
      },
    });

    if (hotel?.hotelsAround) {
      res.send({ success: false, message: "Attraction Site Already Assigned" });
    } else {
      try {
        const yes = await models.Hotel.update(
          { hotelsAround: req.params.attractionId },
          {
            where: {
              Id: req.params.hotelId,
            },
          }
        );
        res.send({ success: yes[0] ? true : false });
      } catch (err) {
        console.log(err);
        return res.status(200).send({
          success: false,
        });
      }
    }
  },
  ///////////////////////////////////////////////
  async updateHotel(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.Hotel.update(body, {
        where: {
          Id: req.params.hotelId,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
    });
  },
  ///////////////////////////////////////////////
  async updateHotelAdmin(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.User.update(body, {
        where: {
          Id: req.params.userId,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
    });
  },
  ///////////////////////////////////////////////
  async updateAttractionSiteType(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.AttractionSite.update(body, {
        where: {
          Id: req.params.Id,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
    });
  },
  ///////////////////////////////////////////////
  async updateAttractionSite(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.AttractionSite.update(body, {
        where: {
          Id: req.params.Id,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
    });
  },
  ///////////////////////////////////////////////
  async deleteHotel(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.Hotel.destroy({
        where: {
          Id: req.params.hotelId,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
    });
  },
  /////////////////////////////////////////////////////////
  async deleteHotelAdmin(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.User.destroy({
        where: {
          Id: req.params.userId,
        },
      });
    } catch (err) {
      return res.status(200).send({
        success: false,
      });
    }

    return res.status(200).send({
      success: true,
    });
  },
  /////////////////////////////////////////////////////////
  async deleteAttractionSiteType(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const d = await models.AttractionSiteType.destroy({
        where: {
          Id: req.params.Id,
        },
      });

      return res.status(200).send({
        success: d,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }
  },
  /////////////////////////////////////////////////////////
  async deleteAttractionSite(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const del = await models.AttractionSite.destroy({
        where: {
          Id: req.params.Id,
        },
      });

      return res.status(200).send({
        success: del ? true : false,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////
  async addAttractionSiteType(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const attractionSiteType = await models.AttractionSiteType.create(body);
      return res.status(200).send({
        success: true,
        message: attractionSiteType,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////
  async addAttractionSite(req, res) {
    if (!req.user?.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    if (!req.files) {
      res.send({ success: false, message: "No files uploaded" });
    } else {
      try {
        const attractionSite = await models.AttractionSite.create(req.body);

        var files = [];
        var fileKeys = Object.keys(req.files);

        fileKeys.forEach(function (key) {
          files.push(req.files[key]);
        });

        files.forEach((image, i) => {
          let u = image.mv(
            "Photos/Attraction/" + attractionSite.Id + i + ".jpg",
            function (err) {
              if (err) return res.send(err);
            }
          );
        });

        res.send({ success: true, attractionSite });
      } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Sever Error" });
      }
    }
  },
  ///////////////////////////////////////////
  async getUsers(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(200).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const users = await models.User.findAll();
      return res.status(200).send({
        success: true,
        message: users,
      });
    } catch (err) {
      return res.status(200).send({
        success: false,
      });
    }
  },
  //  async getAttractionSite(req, res) {},
  ///////////////////////////////////////////
  async getFeedback(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });

    try {
      const Feedback = await models.Feedback.findAll({
        where: {
          HotelId: req.params.hotelId,
        },
      });
      return res.status(200).send({
        success: true,
        message: Feedback,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////
  async getUserCount(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const userCount = await models.User.count();
      return res.status(200).send({
        success: true,
        message: { "user count": userCount },
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  async getHotelAdminCount(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const hotelAdminCount = await models.User.count({
        where: {
          RoleId: 2,
        },
      });
      return res.status(200).send({
        success: true,
        message: { "hotel admin count": hotelAdminCount },
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  async getAttractionSiteCount(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const attractionSiteCount = await models.AttractionSite.count();
      return res.status(200).send({
        success: true,
        message: { "attraction site count": attractionSiteCount },
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////
  async getHotelCount(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const hotelCount = await models.Hotel.count();
      return res.status(200).send({
        success: true,
        message: { "hotel count": hotelCount },
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  async getCounts(req, res) {
    const hotelCount = await models.Hotel.count();
    const attractionSiteCount = await models.AttractionSite.count();
    const userCount = await models.User.count();
    const bookingCount = await models.Booking.count();

    res.send({
      hotelCount,
      attractionSiteCount,
      userCount,
      bookingCount,
    });
  },
  async addRegion(req, res) {
    try {
      if (!req.files) {
        res.send({ success: false, message: "No image uploaded!" });
      } else {
        const region = await models.Region.create(req.body);
        req.files.Photo.mv(
          "Photos/Regions/region" + region.Id + ".jpg",
          function (err) {
            if (err) {
              return res.send(err);
            } else {
              res.send({ success: true });
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Server Error" });
    }
  },
};
