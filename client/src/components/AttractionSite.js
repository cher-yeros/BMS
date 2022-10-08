import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import apiCall from "../apiCall";
import AdminNavbar from "./admin/Navbar";
import Sidebar from "./admin/Sidebar";
import Hotels from "./customer/Hotels";
import { EditAttractionSite } from "./EditAttractionSite";
import { Gallary } from "./Gallary";
import Navbar from "./Navbar";

function AttractionSite() {
  const location = useLocation();

  const [Site, setSite] = useState({});
  //const [Hotels, setHotels] = useState([]);
  useEffect(() => {
    setSite(location.state.Site);
    getHotelsAround();
  }, []);

  function handleInput() {}
  function handleEdit() {}
  function handleSite() {}
  function gallary() {}

  const CU = useSelector((state) => state.auth.loggedUser);

  const latitude = 7.05111489,
    longitude = 38.1531815;

  console.log(Site);

  const [HotelsAround, setHotelsAround] = useState([]);

  function getHotelsAround() {
    apiCall
      .get("/v1/customer/get-hotels-around/" + Site.Id)
      .then(({ data }) => {
        console.log(data.message);

        if (data.success) {
          setHotelsAround(data.message);
        }
      });
  }

  function printStar(rating, i) {
    let star =
      rating > i ? (
        <i key={i} style={{ color: "orange" }} className="fas fa-star" />
      ) : (
        <i key={i} style={{ color: "lightgray" }} className="fas fa-star" />
      );

    return star;
  }
  const n = useNavigate();
  function showHotel(hotel) {
    //console.log(hotel);
    //if (!Auth.checkLoggedIn()) {
    //  alert("Login to book!");
    //} else {
    //console.log(hotel);
    n("/hotel", { state: hotel });
    //}
  }
  return (
    <>
      {CU?.role == "admin" ? (
        <>
          <AdminNavbar />
          <Sidebar />
        </>
      ) : (
        <Navbar />
      )}
      <main
        className="main"
        id="main"
        style={{
          marginLeft: CU == "admin" ? null : "1rem",
        }}
      >
        <div className="section Site">
          <div
            className="row justify-content-center"
            style={{ width: "100% " }}
          >
            <div className="col-xl-9 col-lg-9">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#Site-AttractionSiteOverview"
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
                        Gallary
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
                        data-bs-target="#hotelsAround"
                      >
                        Hotels Around
                      </button>
                    </li>
                    {CU?.role == "admin" ? (
                      <li className="nav-item">
                        <button
                          className="nav-link"
                          data-bs-toggle="tab"
                          data-bs-target="#editsite"
                        >
                          Edit Attraction
                        </button>
                      </li>
                    ) : null}
                  </ul>

                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active Site-AttractionSiteOverview"
                      id="Site-AttractionSiteOverview"
                    >
                      <h2 style={{ fontSize: "2rem" }} className="card-title">
                        About {Site.Name}
                      </h2>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">Name</div>
                        <div className="col-lg-9 col-md-8">{Site.Name}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Description
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {Site.Description}
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

                    <div className="tab-pane fade Site-edit pt-3" id="gallery">
                      {Gallary(Site)}
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
                            src={`
                            https://www.google.com/maps/@${latitude},${longitude},475m/data=!3m1!1e3`}
                          ></iframe>
                        </div>
                      </>
                    </div>
                    <div className="tab-pane fade pt-3" id="hotelsAround">
                      <section className="packages pt-5" id="packages">
                        <div className="box-container">
                          <div className="row mx-3" style={{ width: "100% " }}>
                            {Site?.hotels?.map((hotel) => (
                              <div
                                key={hotel.Id}
                                className="col-lg-4 col-md-6 col-sm-12"
                              >
                                <div className="box">
                                  <img src="assets/images/p-1.jpg" alt="" />
                                  <div className="content">
                                    <h3>
                                      <i className="fas fa-map-marker-alt"></i>{" "}
                                      {hotel.Name}
                                    </h3>

                                    <p>{hotel.Description}</p>
                                    <div className="stars">
                                      {[1, 2, 3, 4, 5].map((r, i) =>
                                        printStar(hotel.Rating, i)
                                      )}
                                    </div>

                                    <button
                                      onClick={() => showHotel(hotel)}
                                      className="bttn"
                                    >
                                      Show More
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                      {/*<Hotels siteId={Site.Id} />*/}
                      {/*<EditAttractionSite Site={Site} />*/}
                    </div>
                    <div className="tab-pane fade pt-3" id="editsite">
                      {/*<Hotels />*/}
                      {/*<EditAttractionSite Site={Site} />>*/}
                      <EditAttractionSite Site={Site} />
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

export default AttractionSite;
