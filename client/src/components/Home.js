import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiCall from "../apiCall";
import Auth from "../Auth";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import TouristAreas from "./customer/TouristAreas";
import Hotels from "./customer/Hotels";
import Regions from "./customer/Regions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const n = useNavigate();
  const CU = useSelector((state) => state.auth.loggedUser);

  const st = {
    margin: "0rem",
    padding: " 1.5rem 2rem",
    background: "none",
    width: "50rem",
  };
  function openLogin() {
    let loginForm = document.querySelector(".login-form-container");

    loginForm.classList.add("active");
  }
  function openRegister() {
    let regForm = document.getElementById("register-form");

    regForm.classList.add("active");
  }
  const [q, setq] = useState("");
  const [Result, setResult] = useState([]);
  function searchSites(e) {
    setq(e.target.value);

    apiCall
      .post("/v1/customer/search-attraction-site?query=" + q)
      .then(({ data }) => {
        setResult(data.message);
      });
  }
  return (
    <>
      <Navbar />
      <section
        className="home"
        id="home"
        style={{
          background: "url(assets/images/bg.jpg)",
        }}
      >
        <div className="content">
          <h3>adventure is worthwhile</h3>
          <p>dicover new places with us, adventure awaits</p>
          <form style={st} action="" className="search-bar-container">
            <input
              value={q}
              onChange={searchSites}
              type="text"
              id="search-bar"
              placeholder="search here..."
              autoComplete="off"
            />
            <label htmlFor="search-bar" className="fas fa-search"></label>
            <div
              className="row justify-content-center"
              style={{
                width: "100%",
                position: "absolute",
                height: "15rem !important",
                overflow: "auto",
              }}
            >
              {q ? (
                <div className="col-lg-6 col-md-8 ">
                  <div className="list-group">
                    {Result.map((res) => (
                      <Link
                        key={res.Id}
                        to="/attraction-site"
                        state={{ Site: res }}
                        className="list-group-item list-group-item-action "
                      >
                        {res.Name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </form>

          {!CU ? (
            <>
              <button onClick={openLogin} id="login-btn" className="bttn">
                Login
              </button>{" "}
              <button onClick={openRegister} className="bttn">
                Register
              </button>
            </>
          ) : null}
        </div>
      </section>

      <Regions />

      <Login />
      <Register />
    </>
  );
}

export default Home;
