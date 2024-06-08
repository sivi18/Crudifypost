import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layoutjsx() {
  return (
    <div className="flex flex-col gap-2 min-h-screen w-fu\">
      <Navbar />
      <div className="flex">
        <Outlet />
      </div>
    </div>
  );
}

export default Layoutjsx;
