const express = require("express");
const joi = require("joi");
const models = require("../models/Schema");
const _ = require("lodash");
const bcrypt = require("bcrypt");

router = express.Router();

module.exports = {
  async hotelAdmin(req, res) {
    const body = req.body;
    const Email = await models.User.findAll({
      raw: true,
      where: {
        Email: body.Email,
      },
    });

    if (Email.length)
      return res.send({ success: false, message: "Email already taken" });

    const PhoneNumber = await models.User.findAll({
      raw: true,
      where: {
        PhoneNumber: body.PhoneNumber,
      },
    });
    if (PhoneNumber.length)
      return res.send({
        success: false,
        message: "PhoneNumber already taken",
      });

    //try {
    const salt = await bcrypt.genSalt(10);
    body.Password = await bcrypt.hash(body.Password, salt);
    const user = await models.User.create(body);

    const u = _.pick(user.dataValues, [
      "Id",
      "FirstName",
      "MiddleName",
      "LastName",
      "PhoneNumber",
      "Gender",
      "Email",
      "createdAt",
    ]);
    return res.status(200).send({ success: true, user: u });
    //} catch (err) {
    //  return res.send("error", err);
    //}
  },
};
