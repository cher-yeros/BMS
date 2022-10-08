import React from "react";
//import * as Icon from 'react-bootstrap-icons'
//import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";

function Sidebar() {
  let adminRoutes = [
    {
      name: "Available Rooms",
      link: "/tourist-areas",
      icon: "bi bi-person",
      key: "tourist_areas",
    },
    {
      name: "Allocated Rooms",
      link: "/manage-users",
      icon: "bi bi-person",
      key: "manage_users",
    },
  ];
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to={"/admin"}>
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {adminRoutes.map((route) => (
          <li key={route.key} className="nav-item">
            {route?.subRoute ? (
              <>
                <a
                  className="nav-link collapsed"
                  data-bs-target="#components-nav"
                  data-bs-toggle="collapse"
                  href="#"
                >
                  <i className="bi bi-menu-button-wide"></i>
                  <span>{route.name}</span>
                  <i className="bi bi-chevron-down ms-auto"></i>
                </a>
                {route.subRoute.map((sr) => (
                  <ul
                    key={sr.key}
                    id="components-nav"
                    className="nav-content collapse "
                    data-bs-parent="#sidebar-nav"
                  >
                    <li>
                      <Link to={"/report" + sr.link}>
                        <i className="bi bi-circle"></i>
                        <span>{sr.key}</span>
                      </Link>
                    </li>
                  </ul>
                ))}
              </>
            ) : (
              <Link to={route.link} className="nav-link collapsed">
                <i className={route.icon}></i>
                <span>{route.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
