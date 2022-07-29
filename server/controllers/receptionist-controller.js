const { Op } = require("Sequelize");

const models = require("../models/Schema");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = {
  async getAvailableRoom(req, res) {
    if (!req.user.hotel)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      // var currentDate = new Date();
      const room = await models.Room.findAll({
        where: {
          [Op.and]: [
            {
              HotelId: req.user.hotel,
              ExpireDate: {
                [Op.lte]: new Date(),
              },
            },
          ],
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
  ////////////////////////////////////////////////
  async getAllocatedRoom(req, res) {
    if (!req.user.hotel)
      return res.status(400).send({
        success: false,
        message: "Access denied.",
      });
    try {
      // var currentDate = new Date();
      const room = await models.Room.findAll({
        where: {
          [Op.and]: [
            {
              HotelId: req.user.hotel,
              ExpireDate: {
                [Op.gte]: new Date(),
              },
            },
          ],
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
};
