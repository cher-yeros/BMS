const Sequelize = require("sequelize");

const DB = new Sequelize("hotel", "root", "", {
  dialect: "mysql",
  logging: false,
});

DB.authenticate()
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

module.exports = DB;
