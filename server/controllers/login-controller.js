const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../Models/schema");
const _ = require("lodash");

const key = "Hotel";

module.exports = {
  async login(req, res) {
    const body = req.body;

    try {
      const Admin = await models.User.findAll({
        raw: true,
        where: {
          Email: body.Email,
        },
      });

      if (!Admin.length)
        return res.send({
          success: false,
          message: "Invalid Email or password.",
        });
      const validPassword = await bcrypt.compare(
        body.Password,
        Admin[0].Password
      );

      if (!validPassword)
        return res.send({
          success: false,
          message: "Invalid Email or password.",
        });

      const token = jwt.sign({ Id: Admin[0].Id, Role: Admin[0].RoleId }, key);

      const u = _.pick(Admin[0], [
        "Id",
        "FirstName",
        "MiddleName",
        "LastName",
        "PhoneNumber",
        "Gender",
        "Email",
        "createdAt",
      ]);

      const role = await models.Role.findOne({
        where: { id: Admin[0].RoleId },
      });

      console.log(u.Id);
      if (role.Name == "receptionist") {
        const recep = await models.Receptionist.findOne({
          where: {
            Email: u.Email,
          },
        });

        const hotel = await models.Hotel.findOne({
          where: {
            Id: recep.hotelId,
          },
          include: [
            {
              model: models.Room,
            },
            {
              model: models.FoodServices,
            },
          ],
        });
        console.log(recep.dataValues);
        u.hotelId = recep?.hotelId;
        u.hotel = hotel.dataValues;

        //u.hotel = recep.hotel;
      }

      return res.send({
        success: true,
        payload: {
          user: u,
          token: token,
          role: role,
        },
      });
    } catch (err) {
      console.log(err);
      return res.send({
        success: false,
        message: "login error",
      });
    }
  },
  //////////////////////////////////////
  async receptionistLogin(req, res) {
    const body = req.body;

    try {
      const Receptionist = await models.Receptionist.findAll({
        raw: true,
        where: {
          Email: body.Email,
        },
      });

      if (!Receptionist.length)
        return res.send({
          success: false,
          message: "Invalid Email or password.",
        });
      const validPassword = await bcrypt.compare(
        body.Password,
        Receptionist[0].Password
      );
      if (!validPassword)
        return res.send({
          success: false,
          message: "Invalid Email or password.",
        });

      const token = jwt.sign(
        { Id: Receptionist[0].Id, hotel: Receptionist[0].hotel },
        key
      );
      return res.send({
        success: true,
        message: {
          token: token,
        },
      });
    } catch (err) {
      console.log(err);
      return res.send({
        success: false,
        message: "login error",
      });
    }
  },
};
