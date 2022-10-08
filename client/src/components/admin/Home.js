import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCounts } from "../../redux/api_calls";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AdminHome() {
  const count = useSelector((state) => state.admin.counts);
  const CU = useSelector((state) => state.auth.loggedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    getCounts(CU.token, dispatch);
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
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Users </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.userCount}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Tourist Areas</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.attractionSiteCount}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Hotels </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.hotelCount}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-3">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Total Bookings</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{count.bookingCount}</h6>
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

export default AdminHome;
