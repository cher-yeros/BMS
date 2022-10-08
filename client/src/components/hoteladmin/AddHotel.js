import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Auth from "../../Auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AddHotel() {
  const n = useNavigate();
  useEffect(() => {
    if (!Auth.checkLoggedIn()) {
      n(`/`);
    } else if (Auth.checkRole() != "hoteladmin") {
      n(`/${Auth.checkRole()}`);
    }
  }, []);
  const [Hotel, setHotel] = useState({
    Name: "",
  });
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
              <form className="card">
                <input
                  type="text"
                  className="box"
                  placeholder="Enter hotel name"
                />
                <input
                  type="text"
                  className="box"
                  placeholder="Enter hotel address"
                />
                <select defaultValue="default" className="box">
                  <option disabled value="default">
                    {" "}
                    Select Star{" "}
                  </option>
                  <option> 1 Star </option>
                  <option> 2 Star </option>
                  <option> 3 Star </option>
                  <option> 4 Star </option>
                  <option> 5 Star </option>
                </select>
                <select defaultValue="default" className="box">
                  <option disabled value="default">
                    Select Hotel Type{" "}
                  </option>
                  <option> Type 1 </option>
                  <option>Type 2</option>
                  <option>Type 3</option>
                  <option>Type 4</option>
                </select>

                <br />
                <div className="row mx-1">
                  <input type="submit" value="Add" className="bttn" />{" "}
                  <input type="reset" value="Reset" className="bttn" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default AddHotel;
