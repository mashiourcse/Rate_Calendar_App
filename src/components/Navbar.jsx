import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState("");
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    setNavbarCollapsed(true);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
      style={{ backgroundColor: "#9df5c6", color: "black" }}
    >
      <div className="container-fluid">
        
        <button
          className="font-weight-bold navbar-toggler font-weight-bold"
          type="button"
          onClick={() => setNavbarCollapsed(!navbarCollapsed)}
          style={{ color: "black" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-center ${
            navbarCollapsed ? "" : "show"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav " >
           
            {/* <li
              className={`nav-item ${
                activeNavItem === "product-list" ? "active" : ""
              }`}
            >
              <Link
                className="custom-link font-weight-bold nav-link"
                to={"/product-list"}
                onClick={() => handleNavItemClick("product-list")}
              >
                Product
              </Link>
            </li> */}
            {/* <li
              className={`nav-item ${
                activeNavItem === "order-list" ? "active" : ""
              }`}
            >
              <Link
                className="custom-link font-weight-bold nav-link"
                to={"/order-list"}
                onClick={() => handleNavItemClick("order-list")}
              >
                Order
              </Link>
            </li> */}
            <li
              className={`nav-item ${
                activeNavItem === "order-list" ? "active" : ""
              }`}
            >
              <Link
                className="custom-link font-weight-bold nav-link"
                to={"/rate-calendar-main"}
                onClick={() => handleNavItemClick("rate-calendar-main")}
              >
                Rate Calendar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
