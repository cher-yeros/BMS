const jwt = require("jsonwebtoken");
const schema = require("../models/Schema");
const key = "Hotel";
module.exports = async function (req, res, next) {
  const token = req.header("x-api-key");
  if (!token)
    return res.status(200).send({
      success: false,
      message: "Access Token.",
    });

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send({
      success: "false",
      message: "Access denied.",
    });
  }
};
