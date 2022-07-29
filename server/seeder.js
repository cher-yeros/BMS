const DB = require("./Models/DB");
const { Role, User, Address, Region } = require("./models/schema");

DB.sync({
  force: true,
  alter: true,
}).then((res) => console.log("done"));

const roles = [
  {
    Id: 1,
    Name: "admin",
  },
  {
    Id: 2,
    Name: "hoteladmin",
  },
  {
    Id: 3,
    Name: "receptionist",
  },
  {
    Id: 4,
    Name: "customer",
  },
];

roles.forEach(async (role) => {
  await Role.create(role);
});

let address = {
  value: "Hawassa",
  value: "Debub",
  value: "Sidama",
};

Address.create(address).then((res) => console.log("address done"));

let admin = {
  FirstName: "1122",
  MiddleName: "4dvvs",
  PhoneNumber: "0984651245",
  Email: "hotelAdmi5@gmail.com",
  AddressId: 1,
  Password: "$2b$10$ZrpPSkS/qimIevrwdILqTuPnYqCtigvwQWfCwyAlYmPc3eL5O1CqC",
  RoleId: 1,
};

User.create(admin).then((res) => console.log("done"));

const regions = [
  { Name: "oromia" },
  { Name: "sidama" },
  { Name: "SNNRP" },
  { Name: "Afar" },
];

regions.forEach(async (r) => await Region.create(r));
