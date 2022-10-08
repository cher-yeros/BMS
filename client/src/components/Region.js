import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
//import Navbar from "./admin/Navbar";
//import Sidebar from "./admin/Sidebar";
//import { AttractionRegionOverview } from "./AttractionRegionOverview";
//import { EditAttractionRegion } from "./EditAttractionRegion";
//import { Gallary } from "./Gallary";
import Navbar from "./Navbar";

function Region() {
  const location = useLocation();

  const [Region, setRegion] = useState({});
  useEffect(() => {
    setRegion(location.state);
  }, []);

  function handleInput() {}
  function handleEdit() {}
  function handleRegion() {}
  function gallary() {}

  return (
    <>
      <Navbar />
      {/*<Sidebar />*/}
      <main className="main" id="main" style={{ marginLeft: "1rem" }}>
        <div className="Region">
          <div className="row justify-content-center">
            <div className=" col-lg-10">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#Region-AttractionRegionOverview"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#sites"
                      >
                        AttractionSites
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#rooms"
                      >
                        Map
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#recepies"
                      >
                        Edit
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active Region-AttractionRegionOverview"
                      id="Region-AttractionRegionOverview"
                    >
                      <h2 style={{ fontSize: "2rem" }} className="card-title">
                        About {Region.Name} Region
                      </h2>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">Name</div>
                        <div className="col-lg-9 col-md-8">{Region.Name}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Description
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {Region.Description}
                        </div>
                      </div>

                      <div className="row  mt-2">
                        <h4 className="mt-1 col-lg-3 col-md-4 label">Map</h4>
                        <div className="mx-1">
                          <iframe
                            style={{
                              width: "100%",
                              height: "20rem",
                              border: "1px solid",
                            }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA70zzf8MxAX2XhcqAD_CE1aYBaX6OlvWk
    &q=Space+Needle,Seattle+WA"
                          ></iframe>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade Region-edit pt-3 packages"
                      id="sites"
                    >
                      <div className="box-container ">
                        <div className="row mx-3" style={{ width: "100% " }}>
                          {Region?.attractionSites?.map((area) => (
                            <div
                              key={area.Id}
                              className="col-lg-3 col-md-6 col-sm-12 mb-2"
                            >
                              <Link
                                to="/attraction-site"
                                state={{ Site: area }}
                              >
                                <div className="box">
                                  <img
                                    src={`http://localhost:4000/Attraction/${
                                      area.Id + "0"
                                    }.jpg`}
                                    alt=""
                                  />
                                  <div className="content">
                                    <h3>
                                      <i className="fas fa-map-marker-alt"></i>{" "}
                                      {area.Name}
                                    </h3>
                                    <p>{area.Description}</p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade pt-3" id="rooms">
                      <>
                        <h4>Location</h4>
                        <div className="row justify-content-center">
                          <iframe
                            style={{
                              width: "100%",
                              height: "20rem",
                              border: "1px solid",
                            }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA70zzf8MxAX2XhcqAD_CE1aYBaX6OlvWk
    &q=Space+Needle,Seattle+WA"
                          ></iframe>
                        </div>
                      </>
                    </div>
                    <div className="tab-pane fade pt-3" id="recepies">
                      {/*<EditAttractionRegion Region={Region} />*/}
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

export default Region;
