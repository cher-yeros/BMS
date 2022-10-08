import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Auth from "../../Auth";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function EditHotels() {
  const n = useNavigate();
  useEffect(() => {
    if (!Auth.checkLoggedIn()) {
      n(`/`);
    } else if (Auth.checkRole() != "hoteladmin") {
      n(`/${Auth.checkRole()}`);
    }
  }, []);
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
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Edit Hotels</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">Users</h5>

                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Stars</th>
                      <th>Location</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                      </td>
                      <td>Address</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                      </td>
                      <td>Address</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                      </td>
                      <td>Address</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                      </td>
                      <td>Address</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                      </td>
                      <td>Address</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                        <i
                          style={{ color: "orange" }}
                          className="fas fa-star"
                        />
                      </td>
                      <td>Address</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>

                    {/*<tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <button
                          onClick={openRegister}
                          className="btn btn-primary btn-sm"
                        >
                          <i className="fas fa-plus"></i> Add New
                        </button>{" "}
                      </td>
                    </tr>*/}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Register />
    </>
  );
}

export default EditHotels;

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
