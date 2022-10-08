import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "../../../apiCall";
import { getAttractionSites } from "../../../redux/api_calls";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { AddHotel } from "./AddHotel";
import { EditHotel } from "./EditHotel";

function ManageHotels() {
  const CU = useSelector((state) => state.auth.loggedUser);
  const sites = useSelector((state) => state.attractionSite.attractionSites);
  const dispatch = useDispatch();
  useEffect(() => {
    getHotelsAdmins();
    getHotels();
    getAttractionSites(CU.token, dispatch);
  }, []);
  const [Hotels, setHotels] = useState([]);
  const [selectedHotel, setselectedHotel] = useState({});
  const [hotelAdmins, sethotelAdmins] = useState([]);

  function getHotelsAdmins() {
    apiCall.get("/v1/admin/get-hotel-admin").then(({ data }) => {
      sethotelAdmins(data);
    });
  }
  function getHotels() {
    apiCall
      .get("/v1/customer/get-hotels", {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setHotels(data.message);
        } else {
          alert(data.message);
        }
      });
  }

  function openRegister() {
    let regForm = document.getElementById("addhotelform");

    regForm.classList.add("active");
  }

  function openEdit(hotel, i) {
    setselectedHotel(hotel);
    let regForm = document.getElementById("edithotelform");
    regForm.classList.add("active");
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

  function handleAssign(selected, hotelId) {
    apiCall
      .post(`/v1/admin/assign-hotel-admin/${hotelId}/${selected[0]?.Id}`)
      .then(({ data }) => {
        if (!data.success) {
          alert(`${data.message ? data.message : "Server Error"}`);
        } else {
          alert("Admin Successfully Assigned");
          getHotels();
        }
      });
  }

  function deleteHotel(id) {
    apiCall.post("/v1/admin/delete-hotel/" + id).then(({ data }) => {
      console.log(data);
      if (!data.success) {
        alert(`${data.message ? data.message : "Server Error"}`);
      } else {
        alert("Hotel Successfully Deleted");
        getHotels();
      }
    });
  }

  function handleAssignSite(selected, hotelId) {
    console.log(selected[0].Id, hotelId);
    apiCall
      .post(`/v1/admin/assign-hotels-around/${hotelId}/${selected[0].Id}`)
      .then(({ data }) => {
        if (data.success) {
          alert("Attraction Site Around is successfully updated");
          getHotels();
        } else {
          alert(data.message);
        }
      });
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
              <li className="breadcrumb-item active"> Hotels</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">Hotels</h5>

                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Rating</th>
                      <th>Address</th>
                      <th>Type</th>
                      <th>Region</th>
                      <th>Assign Admin</th>
                      <th>Attraction Site</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Hotels.map((h, i) => (
                      <tr key={h.Id}>
                        <td>{i + 1}</td>
                        <td>{h.Name}</td>
                        <td>{h.Description}</td>
                        <td>
                          {[1, 2, 3, 4, 5].map((r, i) =>
                            printStar(h.Rating, i)
                          )}
                        </td>
                        <td>{h.Address}</td>
                        <td>{h.Type}</td>
                        <td>{h.region.Name}</td>
                        <td>
                          {h.hotelAdmin ? (
                            <button className="btn btn-success btn-sm">
                              Already Assigned
                            </button>
                          ) : (
                            <Typeahead
                              onChange={(selected) =>
                                handleAssign(selected, h.Id)
                              }
                              id={h.Id}
                              labelKey={(option) =>
                                `${option.FirstName} ${option.LastName}`
                              }
                              options={hotelAdmins}
                            />
                          )}
                        </td>
                        <td>
                          {h.hotelsAround ? (
                            <button className="btn btn-success btn-sm">
                              Already Assigned
                            </button>
                          ) : (
                            <Typeahead
                              onChange={(selected) =>
                                handleAssignSite(selected, h.Id)
                              }
                              id={h.Id}
                              labelKey={(option) => `${option.Name} `}
                              options={sites}
                            />
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => openEdit(h, i)}
                            className="btn btn-success btn-sm"
                          >
                            <i className="fas fa-edit"></i>
                          </button>{" "}
                          <button
                            onClick={() => deleteHotel(h.Id)}
                            className="btn btn-danger btn-sm"
                          >
                            {" "}
                            <i className="fas fa-trash"></i>
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
                      <td></td>
                      <td>
                        <button
                          onClick={openRegister}
                          className="btn btn-primary btn-sm"
                        >
                          {" "}
                          <i className="fas fa-plus"></i> Add New Hotel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddHotel onAdded={() => getHotels()} />
      <EditHotel Hotel={selectedHotel} onAdded={() => getHotels()} />
    </>
  );
}

export default ManageHotels;
