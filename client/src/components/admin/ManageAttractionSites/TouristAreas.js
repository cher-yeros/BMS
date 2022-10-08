import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import api from "../../../apiCall";
import { getAttractionSites, getRegions } from "../../../redux/api_calls";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function TouristAreas() {
  const n = useNavigate();

  function openRegister() {
    const regForm = document.getElementById("addta");

    regForm.classList.add("active");
  }

  const aAreas = useSelector((state) => state.attractionSite.attractionSites);
  const aa = useSelector((state) => state.attractionSite);
  const CU = useSelector((state) => state.auth.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(aa);
    getAttractionSites(CU.token, dispatch);
  }, []);

  function deleteAS(areaId) {
    api
      .post("/v1/admin/delete-attraction-site/" + areaId, {
        headers: { "x-api-key": CU.token },
      })
      .then(({ data }) => {
        if (data.success) {
          getAttractionSites(CU.token, dispatch);
          alert("Successfully deleted");
        } else {
          alert(data.message);
        }
      });
  }

  function openAS(area) {
    n("/attraction-site", { state: { Site: area } });
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
              <li className="breadcrumb-item active">Tourist Areas</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">Tourist Areas</h5>

                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Address</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {aAreas.map((area, i) => (
                      <tr key={area.Id}>
                        <td>{area.Id}</td>
                        <td>{area.Name}</td>
                        <td>{area.attractionSiteTypeId}</td>
                        <td>{area.Description}</td>
                        <td>{area.Address}</td>
                        <td>
                          <button
                            onClick={() => deleteAS(area.Id)}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>{" "}
                          <button
                            onClick={() => openAS(area)}
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

      <Register onAdded={() => getAttractionSites(CU.token, dispatch)} />
    </>
  );
}

export default TouristAreas;

function Register(props) {
  const CU = useSelector((state) => state.auth.loggedUser);
  const regions = useSelector((state) => state.region.regions);

  const dispatch = useDispatch();
  useEffect(() => {
    getRegions(CU.token, dispatch);
  }, []);

  const [AttractionSite, setAttractionSite] = useState({
    Name: "",
    Description: "",
    Type: "cultural",
    regionId: "1",
    Latitude: 0.0,
    Longitude: 0.0,
    Address: "",
    Photos: "",
  });
  function closeForm(e) {
    if (e) e.preventDefault();
    const loginForm = document.getElementById("addta");

    loginForm.classList.remove("active");
  }

  function handleInput(e) {
    const newAS = { ...AttractionSite };
    newAS[e.target.name] = e.target.value;

    setAttractionSite(newAS);
  }

  function handleImages(e) {
    const images = e.target.files;
    if (images.length <= 5) {
      const newAS = { ...AttractionSite };
      newAS.Photos = e.target.files;
      setAttractionSite(newAS);
    } else {
      alert("More than 5 images are not supported");
      e.target.value = e.target.defaultValue;
    }
  }

  const n = useNavigate();
  function submit(e) {
    e.preventDefault();

    const formdata = new FormData();
    for (let i = 0; i < AttractionSite.Photos.length; i++) {
      formdata.append(`image${i + 1}`, AttractionSite.Photos[i]);
    }
    formdata.append("Name", AttractionSite.Name);
    formdata.append("Description", AttractionSite.Description);
    formdata.append("Type", AttractionSite.Type);
    formdata.append("regionId", AttractionSite.regionId);
    formdata.append(
      "attractionSiteTypeId",
      AttractionSite.attractionSiteTypeId
    );
    formdata.append("Latitude", AttractionSite.Latitude);
    formdata.append("Longitude", AttractionSite.Longitude);
    formdata.append("Address", AttractionSite.Address);

    api
      .post("/v1/admin//add-attraction-site", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          alert("Successfully added Attraction");
          closeForm();
          props.onAdded();
        } else {
          alert(data.message);
        }
      });
  }
  return (
    <div className="login-form-container" id="addta">
      <i onClick={closeForm} className="fas fa-times" id="form-close"></i>

      <form encType="multipart/form-data">
        <h3>Add Tourist Area</h3>
        <div className="row">
          <div className="col-lg-12">
            <input
              name="Name"
              value={AttractionSite.Name}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Name"
            />
          </div>
          <div className="col-lg-12">
            <textarea
              name="Description"
              value={AttractionSite.Description}
              onChange={handleInput}
              placeholder="Enter Description"
              className="box"
              rows={3}
            />
          </div>

          <div className="col-lg-12">
            <input
              name="Address"
              value={AttractionSite.Address}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Address"
            />
          </div>
          <div className="col-lg-12">
            <input
              name="Photos"
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
              value={AttractionSite.Type}
              onChange={handleInput}
              className="box"
            >
              <option disabled value="default">
                Select Type
              </option>
              <option value="cultural"> Cultural </option>
              <option value="natural"> Natural </option>
              <option value="historical"> Historical </option>
            </select>
          </div>
          <div className="col-lg-6">
            <select
              name="regionId"
              value={AttractionSite.regionId}
              onChange={handleInput}
              className="box"
            >
              <option disabled value="default">
                Region
              </option>
              {regions.map((region) => (
                <option value={region.Id}>{region.Name}</option>
              ))}
            </select>
          </div>
          {/*<div className="col-lg-6">
            <input
              name="Latitude"
              value={AttractionSite.Latitude}
              onChange={handleInput}
              type="number"
              className="box"
              placeholder="Latitude"
            />
          </div>
          <div className="col-lg-6">
            <input
              name="Longitude"
              value={AttractionSite.Longitude}
              onChange={handleInput}
              type="number"
              className="box"
              placeholder="Longitude"
            />
          </div>*/}
        </div>
        <br />
        <button onClick={submit} type="submit" className="bttn">
          Save
        </button>
        <button onClick={closeForm} className="bttn">
          Close
        </button>
        <br />
        <br />
      </form>
    </div>
  );
}
