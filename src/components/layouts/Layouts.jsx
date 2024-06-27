import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const Layouts = () => {
  return (
    <div className="row">
      <div className="col-12">
        <Navbar />
      </div>
      <div className="col-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Layouts;
