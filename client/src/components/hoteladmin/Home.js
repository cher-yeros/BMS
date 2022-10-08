import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiCall from "../../apiCall";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function HotelAdminHome() {
  const [Hotel, setHotel] = useState({});

  const CU = useSelector((state) => state.auth.loggedUser);
  useEffect(() => {
    apiCall
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
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Rooms</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{Hotel.rooms?.length}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Recepies </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{Hotel.foodServices?.length}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Feedbacks</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{Hotel.feedbacks?.length}</h6>
                        </div>
                      </div>
                    </div>
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

export default HotelAdminHome;
