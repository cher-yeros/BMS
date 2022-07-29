const { Op } = require("Sequelize");
const models = require("../models/Schema");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = {
  ///////////////////////////////////////////

  async getAttractionSite(req, res) {
    //if (!req.user.Role)
    //  return res.status(400).send({
    //    success: false,
    //    message: "Access denied.",
    //  });
    try {
      const AttractionSite = await models.AttractionSite.findAll({
        include: [
          {
            model: models.Region,
          },
          {
            model: models.Hotel,
          },
        ],
      });

      return res.status(200).send({
        success: true,
        message: AttractionSite,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
        err,
      });
    }
  },
  ///////////////////////////////////////////

  async getRegion(req, res) {
    //if (!req.user.Role)
    //  return res.status(400).send({
    //    success: false,
    //    message: "Access denied.",
    //  });
    try {
      const region = await models.Region.findAll({
        //include: [models.Region, models.AttractionSiteType],
        include: [
          {
            model: models.AttractionSite,
            include: [
              {
                model: models.Region,
              },
              {
                model: models.Hotel,
                include: [models.Room, models.FoodServices, models.Region],
              },
            ],
          },
        ],
      });

      return res.status(200).send({
        success: true,
        message: region,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
        err,
      });
    }
  },
  ///////////////////////////////////////////
  async getHotel(req, res) {
    //if (!req.user.Role)
    //  return res.status(400).send({
    //    success: false,
    //    message: "Access denied.",
    //  });
    try {
      const Hotel = await models.Hotel.findAll({
        include: [
          //{
          //  model: models.Address,
          //},
          {
            model: models.Region,
          },
          //{
          //  model: models.HotelType,
          //},
          {
            model: models.Room,
            //where: {
            //  booked: false,
            //},
          },
        ],
      });
      return res.status(200).send({
        success: true,
        message: Hotel,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }
  },
  ////////////////////////////////////////////
  async bookRoom(req, res) {
    const body = req.body;
    console.log(req.params);
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      body.roomId = req.params.roomId;
      body.userId = req.params.userId;

      console.log(body.roomId, body.userId);

      //const room = await models.Room.findOne({
      //  raw: true,
      //  where: {
      //    Id: req.params.roomId,
      //  },
      //});

      //var bookDay = new Date(body.ExpireTime);
      //var roomExpDay = new Date(room.ExpireDate);
      //console.log(bookDay.valueOf());
      //console.log(room.ExpireDate);
      //console.log(roomExpDay.valueOf());
      // if(d1.getDate < d2.getDate){
      //     console.log('expired')

      // }
      //if (room.ExpireDate == null || bookDay > roomExpDay) {

      if (!req.body.release) {
        console.log("Book");
        const room = await models.Room.update(
          {
            ExpireDate: body.ExpireTime,
            booked: true,
          },
          {
            where: {
              Id: req.params.roomId,
            },
          }
        );

        const booked = await models.Booking.findOne({
          where: {
            roomId: req.params.roomId,
            userId: req.params.userId,
          },
        });

        if (!booked) {
          const booking = await models.Booking.create(body);

          return res.status(200).send({
            success: true,
            message: "booked",
          });
        } else {
          return res.status(200).send({
            success: false,
            message: "Room is already booked",
          });
        }
      } else {
        console.log("Release");
        const room = await models.Room.update(
          {
            ExpireDate: null,
            booked: false,
          },
          {
            where: {
              Id: req.params.roomId,
            },
          }
        );

        const bookdeleted = await models.Booking.destroy({
          where: {
            roomId: req.params.roomId,
            userId: req.params.userId,
          },
        });

        //console.log(bookdeleted);
        if (bookdeleted) {
          const booking = await models.Booking.create(body);

          return res.status(200).send({
            success: true,
            message: "Released",
          });
        } else {
          return res.status(200).send({
            success: false,
            message: "Server error",
          });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////
  async giveFeedbackToAttraction(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      body.feedbackTypeId = 2;
      const feedback = await models.Feedback.create(body);
      return res.status(200).send({
        success: true,
        message: feedback,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////
  async giveFeedbackToHotel(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      body.HotelId = req.params.HotelId;

      const feedback = await models.Feedback.create(body);
      return res.status(200).send({
        success: true,
        message: feedback,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
        message: "server error",
      });
    }
  },
  ///////////////////////////////////////////
  async searchHotel(req, res) {
    //if (!req.user.Role)
    //  return res.status(400).send({
    //    success: false,
    //    message: "Access denied.",
    //  });
    try {
      const hotel = await models.Hotel.findAll({
        row: true,
        where: {
          Name: {
            [Op.like]: "%" + req.query.query + "%",
          },
        },
      });
      return res.status(200).send({
        success: true,
        message: hotel,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////////////
  async searchAttractionSite(req, res) {
    //if (!req.user.Role)
    //  return res.status(400).send({
    //    success: false,
    //    message: "Access denied.",
    //  });
    try {
      const attractionSite = await models.AttractionSite.findAll({
        row: true,
        where: {
          Name: {
            [Op.like]: "%" + req.query.query + "%",
          },
        },
      });
      return res.status(200).send({
        success: true,
        message: attractionSite,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  async getHotelsAround(req, res) {
    const hotels = await models.AttractionSite.findAll({
      include: [models.Hotel],
    });

    const hoteslsA = await models.Hotel.findAll({
      where: {
        hotelsAround: req.params.attractionId,
      },
    });

    if (!hoteslsA) {
      res.send({
        success: false,
        message: "There is not hotel arround!",
      });
    } else {
      res.send({
        success: true,
        message: hoteslsA,
      });
    }
  },
};
