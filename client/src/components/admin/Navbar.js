import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";
function Navbar() {
  const [notifications, setNotifications] = useState([]);

  let n = useNavigate();
  function logout() {
    dispatch(logoutUser());
  }

  const dispatch = useDispatch();
  const [opened, setOpened] = useState(true);
  useEffect(() => {
    openCloseSidebar();
  }, [opened]);

  function openCloseSidebar() {
    if (opened) {
      document.body.classList.remove("toggle-sidebar");
    } else {
      document.body.classList.add("toggle-sidebar");
    }
  }
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to={"/admin"} className="logo d-flex align-items-center">
          <span className="ml-4 d-none d-lg-block">Admin Dashboard </span>
        </Link>

        <i
          onClick={() => setOpened(!opened)}
          className="bi bi-list toggle-sidebar-btn"
        ></i>

        <Link to="/admin" className="logo d-flex align-items-center">
          <span className=" ml-4 d-none d-lg-block">Dashboard</span>
        </Link>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={
                  null != null
                    ? `http://localhost:5000/`
                    : "assets/img/profile-img.jpg"
                }
                //src="assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Yared Gubegnaw</h6>
                <span>Admin</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/profile"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  onClick={logout}
                  className="dropdown-item d-flex align-items-center"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
