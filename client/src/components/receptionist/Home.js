import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import apiCall from "../../apiCall";
import Auth from "../../Auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function ReceptionistHome() {
  const count = {};
  const CU = useSelector((state) => state.auth.loggedUser);
  const [Rooms, setRooms] = useState([]);
  //const [rooms, setrooms] = useState([]);
  useEffect(() => {
    getRooms();
  }, []);

  function getRooms() {
    apiCall
      .get("v1/hotel-admin/get-room/" + CU.user.hotelId)
      .then(({ data }) => {
        data.success ? setRooms(data.message) : alert(data.message);
      });
  }

  function book(room, i) {
    if (!CU) {
      alert("Please Login to Book a room");
    } else {
      apiCall
        .post("/v1/customer/book-room/" + room.Id + `/${CU.user.Id}`, {
          ExpireTime: "2022-05-28",
          release: false,
        })
        .then(({ data }) => {
          if (!data?.success) {
            alert(data.message);
          } else {
            getRooms();
            //let newr = Rooms.filter((r) => r.Id != room.Id);
            //setRooms(newr);
            //alert(data.message);
          }
        });
    }
  }
  function release(room, i) {
    if (!CU) {
      alert("Please Login to Book a room");
    } else {
      apiCall
        .post("/v1/customer/book-room/" + room.Id + `/${CU.user.Id}`, {
          ExpireTime: "2022-05-28",
          release: true,
        })
        .then(({ data }) => {
          if (!data?.success) {
            alert(data.message);
          } else {
            getRooms();
            //let newr = Rooms.filter((r) => r.Id != room.Id);
            //setRooms(newr);
            //alert(data.message);
          }
        });
    }
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
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className=" info-card sales-card">
              <div className="card-body packages">
                <h5 className="card-title">Available Rooms </h5>
                <div className="box-container">
                  <div className="row mx-3" style={{ width: "100% " }}>
                    <table className="table datatable">
                      <thead>
                        <th>Type</th>
                        <th>Number</th>
                        {/*<th>Status</th>*/}
                        <th>Operation</th>
                      </thead>
                      <tbody>
                        {Rooms.map((r, i) => (
                          <tr key={i}>
                            <td>{r.Type}</td>
                            <td>{r.Number}</td>
                            {/*<th>{r.booked ? "Booked" : "Book"}</th>*/}
                            <td>
                              {r.booked ? (
                                <button
                                  onClick={() => release(r, i)}
                                  class="btn btn-danger btn-sm"
                                >
                                  Release
                                </button>
                              ) : (
                                <button
                                  onClick={() => book(r, i)}
                                  class="btn btn-success btn-sm"
                                >
                                  Book
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/*//<div key={r.Id} className="col-lg-4 col-md-6 col-sm-12">
                      //  <div className="box">
                      //    <img src="assets/images/p-1.jpg" alt="" />
                      //    <div className="content">
                      //      <h4 className="card-title m-0">
                      //        Room Number: {r.Number}
                      //      </h4>
                      //      <h5 className="card-title m-0">Price: {r.Price}</h5>

                      //      {r.booked ? (
                      //        <button
                      //          disabled
                      //          className="btn btn-success btn-sm"
                      //        >
                      //          Already Booked
                      //        </button>
                      //      ) : (
                      //        <button
                      //          onClick={() => book(r, i)}
                      //          className="btn btn-success btn-sm"
                      //        >
                      //          Book Now
                      //        </button>
                      //      )}
                      //    </div>
                      //  </div>
                      //</div>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ReceptionistHome;
