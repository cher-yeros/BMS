import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Auth from "../../Auth";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function ControlBooking() {
  let comments = [];
  function openRegister() {
    let regForm = document.getElementById("adduserform");

    regForm.classList.add("active");
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" className="main">
        <div className="section Hotel">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-9">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#available-rooms"
                      >
                        Available Rooms
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#allocated-rooms"
                      >
                        Allocated Rooms
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#booked-users"
                      >
                        Booked User
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content pt-2">
                    <div className="tab-pane fade pt-3" id="available-rooms">
                      <div className="row px-4">
                        {/*<h5 className="card-title">Available Rooms </h5>*/}

                        <table className="table datatable">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Number</th>
                              <th>Price</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade pt-3" id="allocated-rooms">
                      <div className="row px-4">
                        {/*<h5 className="card-title">Allocated Rooms </h5>*/}

                        <table className="table datatable">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Number</th>
                              <th>Price</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>145</td>
                              <td>145 ETB</td>
                              <td>
                                <button className="btn btn-success btn-sm">
                                  <i className="fas fa-check-double"></i>{" "}
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade pt-3" id="booked-users">
                      <div className="row">
                        <div className="col-lg-12 d-flex justify-content-center">
                          <table className="table datatable">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Phone</th>
                                {/*<th>Country</th>*/}
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {/*{Users.map((user, i) => (
                                    <tr key={user.Id}>
                                      <td>{i + 1}</td>
                                      <td>{`${user.FirstName} ${user.MiddleName} ${user.LastName} `}</td>
                                      <td>
                                        <button className="btn btn-success btn-sm">
                                          {getRole(user.RoleId)}
                                        </button>
                                      </td>
                                      <td>{user.Email}</td>
                                      <td>{user.Phone}</td>
                                      <td>
                                        <button
                                          onClick={() => deleteUser(user.Id)}
                                          className="btn btn-danger btn-sm"
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </button>{" "}
                                        <button
                                          onClick={() => openUser(user)}
                                          className="btn btn-info btn-sm"
                                        >
                                          <i className="fas fa-external-link-alt"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}*/}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ControlBooking;
// <td>
//                        <i
//                          style={{ color: "orange" }}
//                          className="fas fa-star"
//                        />
//                        <i
//                          style={{ color: "orange" }}
//                          className="fas fa-star"
//                        />
//                        <i
//                          style={{ color: "orange" }}
//                          className="fas fa-star"
//                        />
//                        <i
//                          style={{ color: "orange" }}
//                          className="fas fa-star"
//                        />
//                        <i
//                          style={{ color: "orange" }}
//                          className="fas fa-star"
//                        />
//                      </td>

function Register() {
  const [User, setUser] = useState({
    country: "default",
  });
  function closeForm() {
    let loginForm = document.getElementById("adduserform");

    loginForm.classList.remove("active");
  }
  return (
    <div className="login-form-container" id="adduserform">
      <i onClick={closeForm} className="fas fa-times" id="form-close"></i>

      <form>
        <h3>Register User</h3>
        <input type="email" className="box" placeholder="Enter your name" />
        <input type="email" className="box" placeholder="Enter your email" />
        <input type="tel" className="box" placeholder="Enter your phone" />
        <select defaultValue="default" className="box">
          <option disabled value="default">
            {" "}
            Select Your Country{" "}
          </option>
          <option> Ethiopia </option>
          <option> Ethiopia </option>
          <option> Ethiopia </option>
        </select>
        <input
          type="password"
          className="box"
          placeholder="enter your password"
        />
        <input type="password" className="box" placeholder="confirm password" />
        <br /> <br />
        <input type="submit" value="Save" className="bttn" />{" "}
        <input type="reset" value="Reset" className="bttn" />
        <br />
        <br />
      </form>
    </div>
  );
}
