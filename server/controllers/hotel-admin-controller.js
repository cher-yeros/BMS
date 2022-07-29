const { Op } = require("Sequelize");

const models = require("../models/Schema");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = {
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
          hotelAdmin: req.user.Id,
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
  ///////////////////////////////////
  async getHotel(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });

    try {
      const hotel = await models.Hotel.findOne({
        where: {
          hotelAdmin: req.params.userId,
        },
        include: [
          models.Region,
          models.Room,
          models.FoodServices,
          models.Feedback,
        ],
      });

      if (!hotel) {
        return res.status(200).send({
          success: false,
          message: "No Associated hotel found!.",
        });
      }
      return res.status(200).send({
        success: true,
        message: hotel,
      });
    } catch (err) {
      return res.status(200).send({
        success: false,
        message: "server error",
      });
    }
  },
  ///////////////////////////////////
  async getRoom(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });

    try {
      const room = await models.Room.findAll({
        where: {
          HotelId: req.params.hotelId,
        },
      });
      return res.status(200).send({
        success: true,
        message: room,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }
  },
  ///////////////////////////////////
  async getFood(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      const room = await models.FoodServices.findAll({
        where: {
          HotelId: req.params.hotelId,
        },
      });

      return res.status(200).send({
        success: true,
        message: room,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
      });
    }
  },
  //////////////////////////////////////////////
  async addRoom(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      if (!req.files) {
        res.send({ success: false, message: "No Images Uploaded!" });
      } else {
        var files = [];
        var fileKeys = Object.keys(req.files);
        req.body.images = fileKeys.length;

        const room = await models.Room.create(req.body);

        fileKeys.forEach(function (key) {
          files.push(req.files[key]);
        });

        files.forEach((image, i) => {
          image.mv("Photos/Rooms/" + room.Id + i + ".jpg", function (err) {
            if (err) return res.send(err);
          });
        });

        return res.status(200).send({
          success: true,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
        err: err,
      });
    }
  },
  //////////////////////////////////////////////
  async addFood(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });

    try {
      if (!req.files) {
        res.send({ success: false, message: "No Images Uploaded!" });
      } else {
        var files = [];
        var fileKeys = Object.keys(req.files);
        req.body.images = fileKeys.length;
        req.body.hotelId = req.params.hotelId;

        const food = await models.FoodServices.create(req.body);

        fileKeys.forEach(function (key) {
          files.push(req.files[key]);
        });

        files.forEach((image, i) => {
          image.mv("Photos/Foods/" + food.Id + i + ".jpg", function (err) {
            if (err) return res.send(err);
          });
        });

        return res.status(200).send({
          success: true,
        });
      }
    } catch (error) {
      console.log(error);

      return res.status(200).send({
        success: false,
        message: "Server Error",
      });
    }
  },
  ///////////////////////////////////////////////
  async deleteRoom(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.Room.destroy({
        where: {
          Id: req.params.roomId,
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
  async deleteFood(req, res) {
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      await models.FoodServices.destroy({
        where: {
          Id: req.params.foodId,
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
  //////////////////////////////////////////
  async addR(req, res) {
    const body = req.body;
    if (!req.user.Role)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });

    try {
      const salt = await bcrypt.genSalt(10);
      body.Password = await bcrypt.hash(body.Password, salt);

      const Recep = await models.User.create(body);
      const Receptionist = await models.Receptionist.create(body);
      return res.status(200).send({
        success: true,
        message: Receptionist,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
      });
    }
  },
  async getRecepHotel(req, res) {
    const hotel = await models.Hotel.findOne({
      where: {
        Id: req.params.hotelId,
      },
      include: [models.Room, models.FoodServices],
    });

    res.send({ success: true, message: hotel });
  },
};
