import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../Auth";
import { logoutUser } from "../../redux/authSlice";
//import api from '../client'
//import Auth from './Auth'

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  //const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    //fetchNots();
  }, []);

  function fetchNots() {
    //api.get('post/get-notified').then(({ data }) => {
    //    setNotifications(data)
    //})
  }

  //const { t, i18n } = useTranslation();

  function changeLang(l) {
    //i18n.changeLanguage(l);
  }

  let n = useNavigate();
  const dispatch = useDispatch();
  function logout() {
    dispatch(logoutUser());
  }

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
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">
                {notifications.length}
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have {notifications.length} new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              {notifications.map((n) => (
                <div key={n.id}>
                  <li key={n.id} className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning"></i>
                    <div>
                      <h4>{n.type}</h4>
                      <p>{n.body}</p>
                    </div>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </div>
              ))}
            </ul>
          </li>

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-globe"></i>
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Language
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li>
                <span
                  onClick={() => changeLang("en")}
                  className=" dropdown-item d-flex align-items-center"
                >
                  English
                </span>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span
                  onClick={() => changeLang("am")}
                  className=" dropdown-item d-flex align-items-center"
                >
                  አማርኛ
                </span>
              </li>
            </ul>
          </li>

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
