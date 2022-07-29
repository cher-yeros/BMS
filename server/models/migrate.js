const { set } = require("lodash");
const Sequelize = require("sequelize");
const db = require("./DB");

const User = db.define("user", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  FirstName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  MiddleName: {
    type: Sequelize.STRING(50),
    // allowNull: false,
  },
  LastName: {
    type: Sequelize.STRING(50),
    // allowNull: false,
  },
  Gender: {
    type: Sequelize.STRING(1),
    // allowNull: false,
  },
  PhoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Email: {
    type: Sequelize.STRING(70),
    allowNull: false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
const Receptionist = db.define("receptionist", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  FirstName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  MiddleName: {
    type: Sequelize.STRING(50),
    // allowNull: false,
  },
  LastName: {
    type: Sequelize.STRING(50),
    // allowNull: false,
  },
  Gender: {
    type: Sequelize.STRING(1),
    // allowNull: false,
  },
  PhoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Email: {
    type: Sequelize.STRING(70),
    allowNull: false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Hotel = db.define("hotels", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  Rating: {
    type: Sequelize.INTEGER,
    // allowNull: false,
  },
  Description: {
    type: Sequelize.STRING(50),
    // allowNull: false,
  },
  Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Room = db.define("room", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Number: {
    type: Sequelize.INTEGER(10),
    allowNull: false,
  },
  Price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  ExpireDate: {
    type: Sequelize.DATE,
    // allowNull: false,
    // default: '0000-00-00'
  },
  booked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Role = db.define("role", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  Name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

const Address = db.define("address", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Feedback = db.define("feedback", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Note: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Region = db.define("region", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Description: {
    type: Sequelize.STRING,
  },
  Name: {
    type: Sequelize.STRING,
  },
});

const FoodServices = db.define("foodServices", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Price: {
    type: Sequelize.DOUBLE,
  },
  Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
const AttractionSite = db.define("attractionSite", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Booking = db.define("booking", {
  Id: {
    type: Sequelize.INTEGER(8),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ExpireTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  CheckIn: {
    type: Sequelize.STRING,
  },
  CheckOut: {
    type: Sequelize.STRING,
  },
});

//////////////relationShip//////////////////////////////
Receptionist.belongsTo(Hotel);
Hotel.hasMany(Receptionist);

Role.hasMany(User, {
  foreignKey: {
    name: "RoleId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});

Region.hasMany(Hotel, {
  foreignKey: {
    name: "regionId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
Hotel.belongsTo(Region, {
  foreignKey: {
    name: "regionId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});

Hotel.hasMany(Room, {
  foreignKey: {
    name: "HotelId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
Room.belongsTo(Hotel, {
  foreignKey: {
    name: "HotelId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
Hotel.hasMany(Feedback, {
  foreignKey: {
    name: "HotelId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
Hotel.hasMany(FoodServices, {
  foreignKey: {
    name: "hotelId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
Region.hasMany(AttractionSite, {
  foreignKey: {
    name: "regionId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
AttractionSite.belongsTo(Region, {
  foreignKey: {
    name: "regionId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
AttractionSite.hasMany(Hotel, {
  foreignKey: {
    name: "hotelsAround",
    //allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
Hotel.belongsTo(AttractionSite, {
  foreignKey: {
    name: "hotelsAround",
    //allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
User.hasMany(Booking, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
Room.hasMany(Booking, {
  foreignKey: {
    name: "roomId",
    allowNull: false,
    type: Sequelize.INTEGER(8),
  },
});
User.hasMany(Hotel, {
  foreignKey: {
    name: "hotelAdmin",
    // allowNull: false,
    type: Sequelize.INTEGER(8),
    unique: true,
  },
});
Hotel.hasMany(Receptionist, {
  foreignKey: {
    name: "hotel",
    // allowNull: false,
    type: Sequelize.INTEGER(8),
    unique: true,
  },
});

//////////////////////////////////////////////////

module.exports.Region = Region;
module.exports.Feedback = Feedback;
module.exports.Address = Address;
module.exports.Role = Role;
module.exports.Room = Room;
module.exports.Hotel = Hotel;
module.exports.User = User;
module.exports.AttractionSite = AttractionSite;
module.exports.Booking = Booking;
module.exports.FoodServices = FoodServices;
module.exports.Receptionist = Receptionist;

db.sync({
  force: true,
  alter: true,
});
