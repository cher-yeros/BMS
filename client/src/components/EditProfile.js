import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiCall from "../apiCall";
import Auth from "../Auth";

export function EditProfile({ user }) {
  const [User, setUser] = useState(user);
  const [ConfirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setUser(user);
  });
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
  function signup(e) {
    e.preventDefault();
    console.log(User, ConfirmPassword);

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
              Auth.login(data.payload);
              n(`/${Auth.checkRole()}`);
              closeForm();
            }
          });
      }
    });
  }
  return (
    <>
      <div className="row">
        <div className="">
          <form>
            <h3>Register</h3>
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <input
                  name="FirstName"
                  value={User.FirstName}
                  onChange={inputs}
                  type="text"
                  className="box"
                  placeholder="Firstname"
                />
              </div>

              <div className="col-lg-4 col-md-12">
                <input
                  name="MiddleName"
                  value={User.MiddleName}
                  onChange={inputs}
                  type="text"
                  className="box"
                  placeholder="MiddleName"
                />
              </div>
              <div className="col-lg-4 col-md-12">
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
                  defaultValue="default"
                  className="box"
                >
                  <option disabled value="default">
                    {" "}
                    Select Your Gender{" "}
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

              <div className="col-lg-6 col-md-12"></div>
            </div>
            <br />
            <input
              onClick={signup}
              type="submit"
              value="Signup"
              className="bttn"
            />{" "}
            <input type="reset" value="Reset" className="bttn" />
            <br />
            <br />
            <p>
              alerady have an account? <a href="#">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
