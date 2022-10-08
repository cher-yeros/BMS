import React, { useState } from "react";
import apiCall from "../apiCall";

export function EditAttractionSite({ Site }) {
  console.log("Site", Site);
  const [AttractionSite, setAttractionSite] = useState(Site);
  console.log("AttractionSite", AttractionSite);

  //  useEffect(() => {
  //    setAttractionSite(Site);
  //  }, []);
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

  //  const n = useNa();
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

    apiCall
      .post("/v1/admin//add-attraction-site", formdata, {
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
            <h3>Edit Tourist Area{AttractionSite.Name}</h3>
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
                  //value={Site.Photos}
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
                  <option value="1"> Type 1 </option>
                  <option value="2"> Type 2 </option>
                  <option value="3"> Type 3 </option>
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
                  <option value="1">Sidama</option>
                  <option value="2">Amhara</option>
                  <option value="3">Oromia</option>
                </select>
              </div>
              <div className="col-lg-6">
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
