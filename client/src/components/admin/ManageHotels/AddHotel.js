import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import apiCall from "../../../apiCall";
import { getRegions } from "../../../redux/api_calls";

export function AddHotel(props) {
  const regions = useSelector((state) => state.region.regions);
  const CU = useSelector((state) => state.auth.loggedUser);

  const dispatch = useDispatch();
  useEffect(() => {
    getRegions(CU.token, dispatch);
  }, []);

  const [Hotel, setHotel] = useState({
    Name: "",
    Rating: "",
    Description: "",
    Address: "",
    Type: "",
    regionId: "",
    Photos: "",
    Longitude: "",
    Latitude: "",
  });

  function closeForm() {
    let loginForm = document.getElementById("addhotelform");

    loginForm.classList.remove("active");
  }

  function handleInput(e) {
    const newHotel = { ...Hotel };
    newHotel[e.target.name] = e.target.value;

    setHotel(newHotel);
  }

  function handleImages(e) {
    const images = e.target.files;

    if (images.length == 5) {
      const newAS = { ...Hotel };
      newAS.Photos = e.target.files;
      setHotel(newAS);
    } else {
      alert("More than 5 images are not supported");
      e.target.value = e.target.defaultValue;
    }
  }
  const n = useNavigate();

  function submit(e) {
    e.preventDefault();

    const formdata = new FormData();

    for (let i = 0; i < Hotel.Photos.length; i++) {
      formdata.append(`image${i + 1}`, Hotel.Photos[i]);
    }

    formdata.append("Name", Hotel.Name);
    formdata.append("Description", Hotel.Description);
    formdata.append("regionId", Hotel.regionId);
    formdata.append("Type", Hotel.Type);
    formdata.append("Rating", parseInt(Hotel.Rating));
    //formdata.append("Latitude", Hotel.Latitude);
    //formdata.append("Longitude", Hotel.Longitude);
    formdata.append("Address", Hotel.Address);

    apiCall
      .post("/v1/admin/add-hotel", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        if (data.success) {
          alert("Successfully added Hotel!");
          closeForm();
          props.onAdded();
        } else {
          alert(data.message);
        }
      });
  }
  return (
    <div className="login-form-container" id="addhotelform">
      <i onClick={closeForm} className="fas fa-times" id="form-close"></i>

      <form className="card">
        <h3>Add Hotel</h3>
        <div className="row">
          <div className="col-lg-12">
            <input
              name="Name"
              value={Hotel.Name}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Enter hotel name"
            />
          </div>
          <div className="col-lg-12">
            <textarea
              name="Description"
              value={Hotel.Description}
              onChange={handleInput}
              rows={3}
              className="box"
              placeholder="Enter Description"
            />
          </div>
          <div className="col-lg-12">
            <input
              name="Email"
              value={Hotel.Email}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Enter hotel address"
            />
          </div>
          <div className="col-lg-12">
            <input
              name="Photos"
              style={{ borderRadius: "0px" }}
              className="form-control box"
              type="file"
              id="formFileMultiple"
              multiple
              onChange={handleImages}
            ></input>
          </div>
          <div className="col-lg-6">
            <input
              name="Address"
              style={{ borderRadius: "0px" }}
              className=" box"
              type="text"
              value={Hotel.Address}
              onChange={handleInput}
              placeholder="Address"
            ></input>
          </div>
          <div className="col-lg-6">
            <select
              name="Rating"
              value={Hotel.Rating}
              onChange={handleInput}
              className="box"
            >
              <option disabled value="default">
                Select Rating
              </option>
              <option value="1"> 1 Star </option>
              <option value="2"> 2 Star </option>
              <option value="3"> 3 Star </option>
              <option value="4"> 4 Star </option>
              <option value="5"> 5 Star </option>
            </select>
          </div>
          <div className="col-lg-6">
            <select
              name="Type"
              value={Hotel.Type}
              onChange={handleInput}
              className="box"
            >
              <option disabled value="default">
                Select Hotel Type
              </option>
              <option value="hotel">Hotel</option>
              <option value="resort">Resort</option>
              <option value="lodge">Lodge</option>
            </select>
          </div>
          <div className="col-lg-6">
            <select
              value={Hotel.regionId}
              onChange={handleInput}
              name="regionId"
              className="box"
            >
              <option disabled value="default">
                Region
              </option>
              {regions.map((region) => (
                <option key={region.Id} value={region.Id}>
                  {region.Name}
                </option>
              ))}
            </select>
          </div>
          {/*<div className="col-lg-6">
            <input
              name="Latitude"
              value={Hotel.Latitude}
              onChange={handleInput}
              type="number"
              className="box"
              placeholder="Latitude"
            />
          </div>*/}
          {/*<div className="col-lg-6">
            <input
              name="Longitude"
              value={Hotel.Longitude}
              onChange={handleInput}
              type="number"
              className="box"
              placeholder="Longitude"
            />
          </div>*/}
        </div>

        <br />
        <div className="row mx-1">
          <input onClick={submit} type="submit" value="Add" className="bttn" />{" "}
          <input type="reset" value="Reset" className="bttn" />
        </div>
      </form>
    </div>
  );
}
