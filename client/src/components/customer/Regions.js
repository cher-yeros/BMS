import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiCall from "../../apiCall";
import Auth from "../../Auth";

function Regions() {
  useEffect(() => {
    getRegions();
  }, []);
  const [Regions, setRegions] = useState([]);

  function getRegions() {
    apiCall.get("/v1/customer/get-region").then(({ data }) => {
      setRegions(data.message);
    });
  }

  function printStar(rating, i) {
    let star =
      rating > i ? (
        <i style={{ color: "orange" }} className="fas fa-star" />
      ) : (
        <i style={{ color: "lightgray" }} className="fas fa-star" />
      );

    return star;
  }
  const n = useNavigate();
  function openRegion(hotel) {
    n("/region", { state: hotel });
  }
  return (
    <section className="packages pt-5" id="packages">
      <h1 className="heading">
        <span>R</span>
        <span>E</span>
        <span>G</span>
        <span>I</span>
        <span>O</span>
        <span>N</span>
        <span>S</span>
      </h1>

      <div className="box-container">
        <div className="row mx-3" style={{ width: "100% " }}>
          {Regions.map((r) => (
            <div key={r.Id} className="col-lg-3 col-md-6 col-sm-12">
              <div className="box">
                <img src="assets/images/p-1.jpg" alt="" />
                <div className="content">
                  <h3>
                    <i className="fas fa-map-marker-alt"></i> {r.Name}
                  </h3>

                  <p>{r.Description}</p>

                  <div className="price">
                    AttractionSite : <span>{r.attractionSites.length}</span>{" "}
                  </div>

                  <button onClick={() => openRegion(r)} className="bttn">
                    Show More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Regions;
