import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import apiCall from "../apiCall";
import { loginSuccess } from "../redux/authSlice";

function Register() {
  const [User, setUser] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    RoleId: 4,
    AddressId: 1,
  });

  const [ConfirmPassword, setConfirmPassword] = useState("");

  function closeForm() {
    let loginForm = document.getElementById("register-form");

    loginForm.classList.remove("active");
  }

  function inputs(e) {
    let newUser = { ...User };
    newUser[e.target.name] = e.target.value;

    setUser(newUser);
  }
  const n = useNavigate();
  const dispatch = useDispatch();
  function signup(e) {
    e.preventDefault();

    apiCall.post("/v1/signup/hotelAdmin", User).then(({ data }) => {
      if (!data.success) {
        alert(data.message);
      } else {
        apiCall
          .post("/v1/login", { Email: User.Email, Password: User.Password })
          .then(({ data }) => {
            if (!data?.success) {
              alert(data.message);
            } else {
              dispatch(loginSuccess(data.payload));
              n(`/${data.payload.role.Name}`);
              closeForm();
            }
          });
      }
    });
  }
  return (
    <div className="login-form-container" id="register-form">
      <i onClick={closeForm} className="fas fa-times" id="form-close"></i>

      <form>
        <h3>Register</h3>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <input
              name="FirstName"
              value={User.FirstName}
              onChange={inputs}
              type="text"
              className="box"
              placeholder="Firstname"
            />
          </div>

          <div className="col-lg-6 col-md-12">
            <input
              name="MiddleName"
              value={User.MiddleName}
              onChange={inputs}
              type="text"
              className="box"
              placeholder="MiddleName"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <input
              name="LastName"
              value={User.LastName}
              onChange={inputs}
              type="text"
              className="box"
              placeholder="LastName"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <select
              name="Gender"
              value={User.Gender}
              onChange={inputs}
              className="box"
            >
              <option disabled value="default">
                Select Your Gender
              </option>
              <option value="m"> Male </option>
              <option value="f"> Female </option>
            </select>
          </div>

          <div className="col-lg-6 col-md-12">
            <input
              name="PhoneNumber"
              value={User.PhoneNumber}
              onChange={inputs}
              type="tel"
              className="box"
              placeholder="PhoneNumber"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <input
              name="Email"
              value={User.Email}
              onChange={inputs}
              type="email"
              className="box"
              placeholder="Email"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <input
              name="Password"
              value={User.Password}
              onChange={inputs}
              type="password"
              className="box"
              placeholder="Password"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <input
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="box"
              placeholder="ConfirmPassword"
            />
          </div>
          <div className="col-lg-6 col-md-12"></div>
        </div>
        <br />
        <input onClick={signup} type="submit" value="Signup" className="bttn" />
        <input type="reset" value="Reset" className="bttn" />
        <br />
        <br />
        <p>
          alerady have an account? <a href="#">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
