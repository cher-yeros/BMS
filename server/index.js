const express = require("express");
const upload = require("express-fileupload");
const cors = require("cors");
const login = require("./Routes/login");
const admin = require("./Routes/admin");
const signup = require("./Routes/signup");
const hotelAdmin = require("./Routes/hotelAdmin");
const customer = require("./Routes/customer");
const receptionist = require("./Routes/receptionist");

const app = express();
app.use(express.static("Photos"));

app.use(cors());

app.use(upload());

app.use(express.json());

app.use((err, req, res, next) => {
  if (err)
    return res.status(200).send({
      success: false,
      message: "invalid json.",
    });
  else next();
});

app.use("/api/v1/login", login);
app.use("/api/v1/admin", admin);
app.use("/api/v1/signup", signup);
app.use("/api/v1/hotel-admin", hotelAdmin);
app.use("/api/v1/customer", customer);
app.use("/api/v1/receptionist", receptionist);
// app.use('/api/v1/buyer', buyer);
// app.use('/api/v1/image', image);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port} ...`));
