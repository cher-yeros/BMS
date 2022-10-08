import React, { useEffect, useState } from "react";

import { Form } from "react-bootstrap";
import Sidebar from "./admin/Sidebar";
import Navbar from "./admin/Navbar";
import { useLocation } from "react-router";
import apiCall from "../apiCall";
import { EditProfile } from "./EditProfile";
import { UserOverView } from "./UserOverView";

function Profile() {
  const location = useLocation();

  const [User, setUser] = useState({});
  useEffect(() => {
    setUser(location.state);
  }, []);

  function handleInput() {}
  function handleEdit() {}
  function handleUser() {}

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div className="pagetitle">
          <h1></h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active"> User</li>
            </ol>
          </nav>
        </div>
        <div className="section User">
          <div className="row">
            <div className="col-xl-9 col-lg-9">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#User-overview"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#gallery"
                      >
                        Edit Profile
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#rooms"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active User-overview"
                      id="User-overview"
                    >
                      {UserOverView(User)}
                    </div>

                    <div className="tab-pane fade User-edit pt-3" id="gallery">
                      <EditProfile user={User} />
                    </div>

                    <div className="tab-pane fade pt-3" id="recepies">
                      <ChangePassword User={User} />
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

export default Profile;

function ChangePassword({ User }) {
  console.log("User", User);
  const [AttractionUser, setAttractionUser] = useState(User);
  console.log("AttractionUser", AttractionUser);

  //  useEffect(() => {
  //    setAttractionUser(User);
  //  }, []);

  function handleInput(e) {
    const newAS = { ...AttractionUser };
    newAS[e.target.name] = e.target.value;

    setAttractionUser(newAS);
  }

  function handleImages(e) {
    const images = e.target.files;
    if (images.length <= 5) {
      const newAS = { ...AttractionUser };
      newAS.Photos = e.target.files;
      setAttractionUser(newAS);
    } else {
      alert("More than 5 images are not supported");
      e.target.value = e.target.defaultValue;
    }
  }

  //  const n = useNa();
  function submit(e) {
    e.preventDefault();

    const formdata = new FormData();
    for (let i = 0; i < AttractionUser.Photos.length; i++) {
      formdata.append(`image${i + 1}`, AttractionUser.Photos[i]);
    }
    formdata.append("Name", AttractionUser.Name);
    formdata.append("Description", AttractionUser.Description);
    formdata.append("Type", AttractionUser.Type);
    formdata.append("regionId", AttractionUser.regionId);
    formdata.append(
      "attractionUserTypeId",
      AttractionUser.attractionUserTypeId
    );
    formdata.append("Latitude", AttractionUser.Latitude);
    formdata.append("Longitude", AttractionUser.Longitude);
    formdata.append("Address", AttractionUser.Address);

    apiCall
      .post("/v1/admin//add-attraction-User", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        if (data.success) {
          alert("Successfully added Attraction");
        } else {
          alert(data.message);
          //  n("/tourist-areas");
        }
      });
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-8">
          <form encType="multipart/form-data">
            <h3>Edit Tourist Area{AttractionUser.Name}</h3>
            <div className="row">
              <div className="col-lg-12">
                <input
                  name="Name"
                  value={AttractionUser.Name}
                  onChange={handleInput}
                  type="text"
                  className="box"
                  placeholder="Name"
                />
              </div>
              <div className="col-lg-12">
                <textarea
                  name="Description"
                  value={AttractionUser.Description}
                  onChange={handleInput}
                  placeholder="Enter Description"
                  className="box"
                  rows={3}
                />
              </div>

              <div className="col-lg-12">
                <input
                  name="Address"
                  value={AttractionUser.Address}
                  onChange={handleInput}
                  type="text"
                  className="box"
                  placeholder="Address"
                />
              </div>
              <div className="col-lg-12">
                <input
                  name="Photos"
                  //value={User.Photos}
                  onChange={handleImages}
                  type="file"
                  className="box"
                  placeholder="Photos"
                  accept="image/*"
                  multiple
                />
              </div>
              <div className="col-lg-6">
                <select
                  name="Type"
                  value={AttractionUser.Type}
                  onChange={handleInput}
                  className="box"
                >
                  <option disabled value="default">
                    Select Type
                  </option>
                  <option value="1"> Type 1 </option>
                  <option value="2"> Type 2 </option>
                  <option value="3"> Type 3 </option>
                </select>
              </div>
              <div className="col-lg-6">
                <select
                  name="regionId"
                  value={AttractionUser.regionId}
                  onChange={handleInput}
                  className="box"
                >
                  <option disabled value="default">
                    Region
                  </option>
                  <option value="1">Sidama</option>
                  <option value="2">Amhara</option>
                  <option value="3">Oromia</option>
                </select>
              </div>
              <div className="col-lg-6">
                <input
                  name="Latitude"
                  value={AttractionUser.Latitude}
                  onChange={handleInput}
                  type="number"
                  className="box"
                  placeholder="Latitude"
                />
              </div>
              <div className="col-lg-6">
                <input
                  name="Longitude"
                  value={AttractionUser.Longitude}
                  onChange={handleInput}
                  type="number"
                  className="box"
                  placeholder="Longitude"
                />
              </div>
            </div>
            <br />
            <button onClick={submit} type="submit" className="bttn">
              Save
            </button>
            <button type="reset" className="bttn">
              Reset
            </button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </>
  );
}
