import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "../../apiCall";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AddReceptionist() {
  const dispatch = useDispatch();
  const [Hotel, setHotel] = useState({});

  const CU = useSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    apiCall
      .get("/v1/hotel-admin/get-hotel/" + CU.user.Id, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setHotel(data.message);
        }
      });
  }, []);

  const [User, setUser] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    RoleId: 3,
    Address: "",
    hotelId: "",
  });

  const [ConfirmPassword, setConfirmPassword] = useState("");

  function inputs(e) {
    let newUser = { ...User };
    newUser[e.target.name] = e.target.value;
    newUser["hotelId"] = Hotel.Id;
    setUser(newUser);
  }

  function signup(e) {
    e.preventDefault();

    apiCall
      .post("/v1/hotel-admin/add-receptionist", User, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        if (!data.success) {
          alert(data.message);
        } else {
          alert("Successfully Registered!");
        }
      });
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Add Hotel</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Add Hotel</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row justify-content-center">
            <div className="col-lg-7">
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
        </section>
      </main>
    </>
  );
}

export default AddReceptionist;
