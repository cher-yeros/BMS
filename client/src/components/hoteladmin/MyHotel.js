import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { default as api, default as apiCall } from "../../apiCall";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MyHotel() {
  const [Hotel, setHotel] = useState({});

  const CU = useSelector((state) => state.auth.loggedUser);

  useEffect(() => {
    api
      .get("/v1/hotel-admin/get-hotel/" + CU.user.Id, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          setHotel(data.message);
        } else {
          alert(data.message);
        }
      });
  }, []);

  function handleInput() {}
  function handleEdit() {}
  function handleHotel() {}

  console.log(Hotel);
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
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
                        data-bs-target="#addroom"
                      >
                        Add Room
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#recepies"
                      >
                        Recepies
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#addrecepie"
                      >
                        Add Recepies
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#read-feedbacks"
                      >
                        Feedbacks
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content pt-2">
                    {OverViewHotel(Hotel)}
                    {HotelGallary(Hotel)}
                    {HotelRooms(Hotel.Id, Hotel.rooms)}
                    {AddRoom(Hotel.Id, Hotel.rooms)}
                    {HotelRecepies(Hotel.Id, Hotel.foodServices)}
                    {AddRecepies(Hotel.Id)}
                    {ReadFeedbacks(Hotel.Id, Hotel.feedbacks)}
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

export default MyHotel;

function HotelRecepies(hotelId, fooods) {
  console.log(fooods);
  const CU = useSelector((state) => state.auth.loggedUser);

  const [food, setFood] = useState([]);

  console.log(hotelId);
  useEffect(() => {
    getFoods();
  }, []);

  function getFoods() {
    console.log("hotelid", hotelId);
    apiCall
      .get("/v1/hotel-admin/get-food/" + hotelId, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        data.success ? setFood(data.message) : alert("Server error");
      });
  }

  function deleteRoom(room) {
    apiCall
      .post("/v1/hotel-admin/delete-food/" + room.Id, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        data.success ? alert("Successfullly deleted") : alert("Server error");
      });
  }
  return (
    <div className="tab-pane fade pt-3" id="recepies">
      <div className=" info-card sales-card">
        <div className="card-body">
          <h5 className="card-title">Recepies</h5>
          <table className="table datatable">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fooods?.map((f, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{f.Name}</td>
                  <td>{f.Name}</td>
                  <td>{f.Type} ETB</td>
                  <td>
                    <button
                      onClick={() => deleteRoom(f)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fas fa-check-double"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function ReadFeedbacks(hotelId, fbs) {
  const CU = useSelector((state) => state.auth.loggedUser);
  const [feedbacks, setfeedbacks] = useState([]);
  useEffect(() => {
    getfeedbacks();
  }, []);

  function getfeedbacks() {
    apiCall
      .get("get-feedback/" + hotelId, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setfeedbacks(data.message);
      });
  }
  return (
    <div className="tab-pane fade pt-3" id="read-feedbacks">
      <div className=" info-card sales-card">
        <div className="card-body">
          <h5 className="card-title">Feedbacks</h5>
          <table className="table datatable">
            <thead>
              <tr>
                <th>#</th>
                <th>Note</th>
                <th>Date</th>
                {/*<th></th>*/}
              </tr>
            </thead>
            <tbody>
              {fbs?.map((fbs, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{fbs.Note}</td>
                  <td>{new Date(fbs.createdAt).toGMTString()}</td>
                  {/*<td>
                    <button className="btn btn-success btn-sm">
                      <i className="fas fa-check-double"></i> Book Now
                    </button>
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function HotelRooms(hotelId, roooms) {
  console.log(roooms);

  const CU = useSelector((state) => state.auth.loggedUser);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    setRooms(roooms || []);
  }, []);

  function getRooms() {
    apiCall
      .get("/v1/hotel-admin/get-room/" + hotelId, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        console.log(data);
        data.success ? setRooms(data.message) : alert("Server error");
      });
  }

  function deleteRoom(room) {
    apiCall
      .post("/v1/hotel-admin/delete-room/" + room.Id, {
        headers: {
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        data.success ? alert("Successfullly deleted") : alert("Server error");
      });
  }

  return (
    <div className="tab-pane fade pt-3" id="rooms">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-3">
          <div className="card-body">
            <h5 className="card-title"> Rooms </h5>

            <table className="table datatable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Number</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {roooms?.map((room, i) => (
                  <tr key={room.Id}>
                    <td>{i + 1}</td>
                    <td>{room.Type}</td>
                    <td>{room.Number}</td>
                    <td>{room.Price}</td>
                    <td>{room.booked.toString()}</td>
                    <td>
                      <button onClick={() => deleteRoom(room)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
function AddRoom(hotelId, rooms) {
  const [Rooms, setRooms] = useState([]);

  const [newRoom, setnewRoom] = useState({
    Photo: "",
    Type: "",
    Number: "",
    Price: "",
  });

  function handleInput(e) {
    const rm = { ...newRoom };
    rm[e.target.name] = e.target.value;
    setnewRoom(rm);
  }

  function handleImages(e) {
    const images = e.target.files;

    if (images.length >= 1) {
      const newAS = { ...newRoom };
      newAS.Photo = e.target.files;
      setnewRoom(newAS);
    } else {
      alert("upload at least one photo");
      e.target.value = e.target.defaultValue;
    }
  }

  function submit(e) {
    e.preventDefault();
    const fd = new FormData();

    console.log(newRoom);
    for (let i = 0; i < newRoom.Photo.length; i++) {
      fd.append(`image${i + 1}`, newRoom.Photo[i]);
    }

    fd.append("Photo", newRoom.Photo);
    fd.append("Type", newRoom.Type);
    fd.append("Number", newRoom.Number);
    fd.append("Price", newRoom.Price);
    fd.append("HotelId", hotelId);

    api
      .post("/v1/hotel-admin/add-room/" + hotelId, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": CU.token,
        },
      })
      .then(({ data }) => {
        if (data.success) {
          alert("Roomi successfully created!");
        } else {
          alert("server error");
        }
      });
  }

  const CU = useSelector((state) => state.auth.loggedUser);

  function book(room, i) {
    if (!CU) {
      alert("Please Login to Book a room");
    } else {
      api
        .post("/v1/customer/book-room/" + room.Id, { ExpireTime: "2022-05-28" })
        .then(({ data }) => {
          if (!data?.success) {
            alert(data.message);
          } else {
            let newr = rooms.filter((r) => r.Id != room.Id);
            setRooms(newr);
            console.log(data);
          }
        });
    }
  }

  return (
    <div className="tab-pane fade pt-3" id="addroom">
      <div className="row justify-content-center">
        <div className="col-8">
          <form className="">
            <input
              name="Photo"
              //value={newRoom.Photo}
              onChange={handleImages}
              type="file"
              className="box"
              multiple
              placeholder="Select Image"
            />
            <select
              name="Type"
              value={newRoom.Type}
              onChange={handleInput}
              className="box"
            >
              <option disabled value="default">
                Select Room Type
              </option>
              <option value="single bed">Single Bed </option>
              <option value="double bed">Double Bed</option>
              <option value="VIP">VIP</option>
              <option value="family">Family</option>
            </select>
            <input
              name="Number"
              value={newRoom.Number}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Enter Number"
            />
            <input
              name="Price"
              value={newRoom.Price}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Enter Price"
            />
            <br />
            <div className="row mx-1">
              <input
                onClick={submit}
                type="submit"
                value="Add"
                className="bttn"
              />{" "}
              <input type="reset" value="Reset" className="bttn" />
            </div>
          </form>
        </div>
      </div>

      {/*<div className=" info-card sales-card">
        <div className="card-body packages">
          <h5 className="card-title">Available Rooms </h5>
          <div className="box-container">
            <div className="row mx-3" style={{ width: "100% " }}>
              {rooms.map((r, i) => (
                <div key={r.Id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="box">
                    <img src="assets/images/p-1.jpg" alt="" />
                    <div className="content">
                      <h4 className="card-title">Room Number: {r.Number}</h4>
                      <h5 className="card-title">Price: {r.Price}</h5>

                      <button
                        onClick={() => book(r, i)}
                        className="btn btn-success btn-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>*/}
      {/*)}*/}
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
          {hotel.Rating}
          {[1, 2, 3, 4, 5].map((r, i) => printStar(hotel.Rating, i))}
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">{hotel.Address}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Region</div>
        <div className="col-lg-9 col-md-8">{hotel.region?.Name}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">HotelType</div>
        <div className="col-lg-9 col-md-8">{hotel.Type}</div>
      </div>
    </div>
  );
}
function AddRecepies(hotelId, rooms) {
  const [Rooms, setRooms] = useState([]);

  const [newFood, setnewFood] = useState({
    Photo: "",
    Name: "",
    Price: "",
    Type: "",
  });

  function handleInput(e) {
    const rm = { ...newFood };
    rm[e.target.name] = e.target.value;

    setnewFood(rm);
  }

  function handleImages(e) {
    const images = e.target.files;

    if (images.length >= 1) {
      const newAS = { ...newFood };
      newAS.Photo = e.target.files;
      setnewFood(newAS);
    } else {
      alert("upload at least one photo");
      e.target.value = e.target.defaultValue;
    }
  }

  function submit(e) {
    e.preventDefault();
    const fd = new FormData();

    console.log(hotelId);
    for (let i = 0; i < newFood.Photo.length; i++) {
      fd.append(`image${i + 1}`, newFood.Photo[i]);
    }

    fd.append("Photo", newFood.Photo);
    fd.append("Type", newFood.Type);
    fd.append("Name", newFood.Type);
    fd.append("Price", newFood.Price);
    fd.append("HotelId", hotelId);

    api
      .post("/v1/hotel-admin/add-food/" + hotelId, fd, {
        headers: {
          "x-api-key": CU.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        data.success ? alert("succesfully added") : alert("server error");
      });
  }

  const CU = useSelector((state) => state.auth.loggedUser);

  return (
    <div className="tab-pane fade pt-3" id="addrecepie">
      <div className="row justify-content-center">
        <div className="col-8">
          <form className="card">
            <input
              name="Photo"
              //value={newRoom.Photo}
              onChange={handleImages}
              type="file"
              className="box"
              placeholder="Select Image"
              multiple
            />
            <input
              name="Name"
              value={newFood.Name}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Enter Name"
            />
            <select
              name="Type"
              value={newFood.Type}
              onChange={handleInput}
              className="box"
            >
              <option disabled value="default">
                Select Food Type
              </option>
              <option value="cultural">Cultural </option>
              <option value="cultural">Fasting</option>
              <option value="cultural">Non Fasting</option>
              <option value="normal">Normal</option>
              <option value="foreign">Foreign</option>
            </select>

            <input
              name="Price"
              value={newFood.Price}
              onChange={handleInput}
              type="text"
              className="box"
              placeholder="Enter Price"
            />
            <br />
            <div className="row mx-1">
              <input
                onClick={submit}
                type="submit"
                value="Add"
                className="bttn"
              />{" "}
              <input type="reset" value="Reset" className="bttn" />
            </div>
          </form>
        </div>
      </div>

      {/*<div className=" info-card sales-card">
        <div className="card-body packages">
          <h5 className="card-title">Available Rooms </h5>
          <div className="box-container">
            <div className="row mx-3" style={{ width: "100% " }}>
              {rooms.map((r, i) => (
                <div key={r.Id} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="box">
                    <img src="assets/images/p-1.jpg" alt="" />
                    <div className="content">
                      <h4 className="card-title">Room Number: {r.Number}</h4>
                      <h5 className="card-title">Price: {r.Price}</h5>

                      <button
                        onClick={() => book(r, i)}
                        className="btn btn-success btn-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>*/}
      {/*)}*/}
    </div>
  );
}
