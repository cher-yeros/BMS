import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCall from "../../apiCall";

function TouristAreas() {
  const [Areas, setAreas] = useState([]);
  useEffect(() => {
    getAreas();
  }, []);

  function getAreas() {
    apiCall.get("/v1/customer/get-attraction-site").then(({ data }) => {
      setAreas(data.message);
    });
  }

  return (
    <section className="packages pt-5" id="packages">
      <h1 className="heading">
        <span>T</span>
        <span>O</span>
        <span>U</span>
        <span>R</span>
        <span>I</span>
        <span>S</span>
        <span>T</span>
        <span> </span>
        <span>A</span>
        <span>R</span>
        <span>E</span>
        <span>A</span>
        <span>S</span>
      </h1>

      <div className="box-container">
        <div className="row mx-3">
          {Areas.map((area) => (
            <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
              <Link to="/attraction-site">
                <div className="box">
                  <img
                    src={`http://localhost:4000/Attraction/${
                      area.Id + "0"
                    }.jpg`}
                    alt=""
                  />
                  <div className="content">
                    <h3>
                      <i className="fas fa-map-marker-alt"></i> {area.Name}
                    </h3>
                    <p>{area.Description}</p>
                    {/*<div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>*/}
                    {/*<div className="price">
                    $90.00 <span>$120.00</span>{" "}
                  </div>*/}
                    {/*<a href="#" className="btn">
                    book now
                  </a>*/}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TouristAreas;
