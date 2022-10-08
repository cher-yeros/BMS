import { useEffect, useState } from "react";

import api from "../../apiCall";
import Auth from "../../Auth";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import apiCall from "../../apiCall";

function Hotel() {
  const Hotel = useLocation().state;
  console.log(Hotel);
  //const [Hotel, setHotel] = useState({});

  const CU = useSelector((state) => state.auth.loggedUser);

  //useEffect(() => {
  //  api
  //    .get("/v1/customer/get-hotels-around/" + 1, {
  //      headers: {
  //        "x-api-key": CU.token,
  //      },
  //    })
  //    .then(({ data }) => {
  //      console.log(data.message);

  //      if (data.success) {
  //        setHotel(data.message);
  //      }
  //    });
  //}, []);

  function handleInput() {}
  function handleEdit() {}
  function handleHotel() {}

  return (
    <>
      <Navbar />
      {/*<Sidebar />*/}
      <main className="main" id="main" style={{ marginLeft: "1rem" }}>
        <div className="section Hotel">
          <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-9">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#Hotel-overview"
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
                        Rooms
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#foods"
                      >
                        Recepies
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#feedback"
                      >
                        Feedback
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content pt-2">
                    {OverViewHotel(Hotel)}

                    {HotelGallary(Hotel)}

                    {HotelRooms(Hotel.rooms)}

                    {HotelRecepies(Hotel.foodServices)}

                    {GiveFeedback(Hotel)}
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

export default Hotel;

function GiveFeedback(hotel) {
  const CU = useSelector((state) => state.auth.loggedUser);

  console.log(hotel, CU);

  const [feedback, setFeedback] = useState({
    Note: "",
    HotelId: hotel.Id,
  });

  const [Note, setNote] = useState("");

  function submit(e) {
    e.preventDefault();

    apiCall
      .post("/v1/customer/give-feedback-to-hotel/" + hotel.Id, {
        Note,
        HotelId: hotel.Id,
      })
      .then(({ data }) => {
        data.success ? alert("Successfully sent ") : alert(data.message);
      });
  }
  return (
    <div className="tab-pane fade pt-3" id="feedback">
      <div className="row justify-content-center">
        <div className="col-8">
          <form className="card">
            <textarea
              type="text"
              className="box"
              placeholder="Writer your feedback here"
              rows={5}
              value={Note}
              onChange={(e) => setNote(e.target.value)}
            />

            <br />
            <div className="row mx-1">
              <input
                onClick={submit}
                type="submit"
                value="Save"
                className="bttn"
              />{" "}
              <input type="reset" value="Reset" className="bttn" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
function HotelRecepies(foods) {
  return (
    <div className="tab-pane fade pt-3" id="foods">
      <div className=" info-card sales-card">
        <div className="card-body packages">
          <h5 className="card-title">Food Services </h5>
          <div className="box-container">
            <div className="row mx-3" style={{ width: "100% " }}>
              {foods.map((r, i) => (
                <div key={r.Id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="box">
                    <img src="assets/images/p-1.jpg" alt="" />
                    <div className="content">
                      <h4 className="card-title m-0">Name: {r.Name}</h4>
                      <h4 className="card-title m-0">Type: {r.Type}</h4>
                      <h5 className="card-title m-0">Price: {r.Price}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function HotelRooms(rooms) {
  const CU = useSelector((state) => state.auth.loggedUser);
  const [Rooms, setRooms] = useState(rooms);
  useEffect(() => {
    setRooms(rooms);
  });

  function book(room, i) {
    if (!CU) {
      alert("Please Login to Book a room");
    } else {
      api
        .post("/v1/customer/book-room/" + room.Id + `/${CU.user.Id}`, {
          ExpireTime: "2022-05-28",
        })
        .then(({ data }) => {
          if (!data?.success) {
            alert(data.message);
          } else {
            let newr = rooms.filter((r) => r.Id != room.Id);
            setRooms(newr);
            alert(data.message);
          }
        });
    }
  }
  return (
    <div className="tab-pane fade pt-3" id="rooms">
      <div className=" info-card sales-card">
        <div className="card-body packages">
          <h5 className="card-title">Available Rooms </h5>
          <div className="box-container">
            <div className="row mx-3" style={{ width: "100% " }}>
              {rooms.map((r, i) => (
                <div key={r.Id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="box">
                    <img src="assets/images/p-1.jpg" alt="" />
                    <div className="content">
                      <h4 className="card-title m-0">
                        Room Number: {r.Number}
                      </h4>
                      <h5 className="card-title m-0">Price: {r.Price}</h5>

                      {r.booked ? (
                        <button disabled className="btn btn-success btn-sm">
                          Already Booked
                        </button>
                      ) : (
                        <button
                          onClick={() => book(r, i)}
                          className="btn btn-success btn-sm"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function HotelGallary(Hotel) {
  return (
    <div className="tab-pane fade Hotel-edit pt-3" id="gallery">
      <h3>Gallery</h3>
      <div className="row">
        {[0, 1, 2, 3, 4].map((p) => (
          <div key={p} className="col-lg-6 col-md-4">
            <img
              style={{ width: "100%" }}
              src={`http://127.0.0.1:4000/Hotels/${Hotel.Id + "" + p}.jpg`}
            />
            {/*<button className="btn btn-success btn-sm my-2" type="button">
                Upload another
              </button>*/}
          </div>
        ))}
      </div>
    </div>
  );
}
function OverViewHotel(hotel) {
  function printStar(rating, i) {
    let star =
      rating > i ? (
        <i key={i} style={{ color: "orange" }} className="fas fa-star" />
      ) : (
        <i key={i} style={{ color: "lightgray" }} className="fas fa-star" />
      );

    return star;
  }
  return (
    <div
      className="tab-pane fade show active Hotel-overview"
      id="Hotel-overview"
    >
      <h5 className="card-title" style={{ fontSize: "2rem" }}>
        About {hotel.Name}
      </h5>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Name</div>
        <div className="col-lg-9 col-md-8">{hotel.Name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Description</div>
        <div className="col-lg-9 col-md-8">{hotel.Description}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Star</div>
        <div className="col-lg-9 col-md-8">
          {[1, 2, 3, 4, 5].map((r, i) => printStar(hotel.Rating, i))}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">{hotel.Address}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Region</div>
        {/*<div className="col-lg-9 col-md-8">{hotel.region.Name || "Region"}</div>*/}
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">HotelType</div>
        <div className="col-lg-9 col-md-8">{hotel.Type}</div>
      </div>
    </div>
  );
}
