import { useEffect, useState } from "react";
import apiCall from "../../../apiCall";

export function EditHotel(props) {
  const [Hotel, setHotel] = useState({
    Name: "",
    Rating: "",
    Description: "",
    AddressId: "1",
    HotelTypeId: "",
    regionId: "",
    Photos: "",
    Longitude: "",
    Latitude: "",
  });

  useEffect(() => {
    console.log(props);
    setHotel(props.Hotel);
  }, []);

  function closeForm() {
    let loginForm = document.getElementById("edithotelform");

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

  function submit(e) {
    e.preventDefault();

    const formdata = new FormData();
    for (let i = 0; i < Hotel.Photos.length; i++) {
      formdata.append(`image${i + 1}`, Hotel.Photos[i]);
    }
    formdata.append("Name", Hotel.Name);
    formdata.append("Description", Hotel.Description);
    formdata.append("regionId", Hotel.regionId);
    formdata.append("HotelTypeId", Hotel.HotelTypeId);
    formdata.append("Rating", parseInt(Hotel.Rating));
    formdata.append("Latitude", Hotel.Latitude);
    formdata.append("Longitude", Hotel.Longitude);
    formdata.append("AddressId", Hotel.AddressId);

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
    <div className="login-form-container" id="edithotelform">
      <i onClick={closeForm} className="fas fa-times" id="form-close"></i>

      <form className="card">
        <h3>Edit {Hotel.Name} Hotel</h3>
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
          <div className="col-lg-6">
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
              name="HotelTypeId"
              value={Hotel.HotelTypeId}
              onChange={handleInput}
              className="box"
            >
              <option disabled value="default">
                Select Hotel Type
              </option>
              <option value="1"> Type 1 </option>
              <option value="2">Type 2</option>
              <option value="3">Type 3</option>
              <option value="4">Type 4</option>
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
              <option value="1">Sidama</option>
              <option value="2">Amhara</option>
              <option value="3">Oromia</option>
            </select>
          </div>
          <div className="col-lg-6">
            <input
              name="Latitude"
              value={Hotel.Latitude}
              onChange={handleInput}
              type="number"
              className="box"
              placeholder="Latitude"
            />
          </div>
          <div className="col-lg-6">
            <input
              name="Longitude"
              value={Hotel.Longitude}
              onChange={handleInput}
              type="number"
              className="box"
              placeholder="Longitude"
            />
          </div>
        </div>

        <br />
        <div className="row mx-1">
          <button onClick={submit} value="Edit" className="bttn">
            submit
          </button>
          <button type="reset" className="bttn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
