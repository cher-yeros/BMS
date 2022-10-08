import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import api from "../../../apiCall";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function ManageUsers() {
  const n = useNavigate();
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    api.get("/v1/admin/get-users").then(({ data }) => {
      setUsers(data.message);
    });
  }

  function openRegister() {
    let regForm = document.getElementById("adduserform");

    regForm.classList.add("active");
  }
  function getRole(id) {
    switch (id) {
      case 1:
        return "admin";
        break;
      case 2:
        return "hoteladmin";
        break;
      case 3:
        return "receptionist";
        break;

      default:
        return "customer";
        break;
    }
  }
  function openUser(user) {
    n(`/user-profile`, { state: user });
  }
  function deleteUser(userId) {
    api.post("/v1/admin/delete-hotel-admin/" + userId).then(({ data }) => {
      if (!data.success) {
        alert(data.message);
      } else {
        alert("Successfully deleted");
        getUsers();
      }
    });
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
              <li className="breadcrumb-item active">Users</li>
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
                      <th>Role</th>
                      <th>Email</th>
                      <th>Phone</th>
                      {/*<th>Country</th>*/}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Users.map((user, i) => (
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
                    ))}

                    <tr>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Register userAdded={() => getUsers()} />
    </>
  );
}

export default ManageUsers;

function Register(props) {
  const [User, setUser] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    RoleId: "",
    AddressId: 1,
  });

  const [ConfirmPassword, setConfirmPassword] = useState("");

  function closeForm() {
    let loginForm = document.getElementById("adduserform");
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
    User.AddressId = 1;
    if (User.Password != ConfirmPassword) {
      alert("Password doesn't match!");
    } else {
      api.post("/v1/signup/hotelAdmin", User).then(({ data }) => {
        if (!data.success) {
          alert(data.message);
        } else {
          alert("Successfully Added!");
          closeForm();
          props.userAdded();
        }
      });
    }
  }
  return (
    <div className="login-form-container" id="adduserform">
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
            <select
              name="RoleId"
              value={User.RoleId}
              onChange={inputs}
              defaultValue="default"
              className="box"
            >
              <option disabled value="default">
                Select Role
              </option>
              <option value="1"> Admin </option>
              <option value="2"> Hotel Admin </option>
              {/*<option value="3"> Receptionist </option>*/}
              <option value="4"> Customer </option>
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
          <div className="col-lg-12 col-md-12">
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
          value="Add"
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
  );
}
