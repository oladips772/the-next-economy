/** @format */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";

function Sidebar() {
  const status = navigator.onLine;
  const [systemStatus, setSystemStatus] = useState(status);

  useEffect(() => {
    setSystemStatus(status);
  }, [status, navigator]);

  return (
    <div className="h-[100vh] bg-black w-[220px] fixed ">
      <div className="text-center justify-center">
        <img
          src="/images/site-logo2.png"
          className="object-contain ml-6 "
          alt=""
        />
      </div>
      <div className="mt-6">
        <div className="my-3 border-l-4 border-green-500 hover:text-green-500">
          <NavLink to="/" className="flex items-center hover:text-green-500">
            <GridViewOutlinedIcon className="mx-4 text-green-500 text-lg" />
            <p className="text-green-500 text-lg">Dashboard</p>
          </NavLink>
        </div>
        <div className="my-3">
          <NavLink to="/Recruitment" className="flex items-center">
            <PeopleAltOutlinedIcon className="mx-4 text-white text-lg" />
            <p className="text-white text-lg">Recruitment</p>
          </NavLink>
        </div>
        <div className="my-3">
          <NavLink to="/" className="flex items-center">
            <PersonPinOutlinedIcon className="mx-4 text-white text-lg" />
            <p className="text-white text-lg">Staffs</p>
          </NavLink>
        </div>
      </div>
      <div className="absolute bottom-2 flex items-center mx-2">
        <p className="text-white text-[11px] font-bold">SYSTEM STATUS : </p>
        <span
          className={`h-2 w-2 rounded-full ml-4 ${
            systemStatus ? "bg-green-400" : "bg-red-600"
          }`}
        ></span>
        <span
          className={` ml-1 text-[11px] font-bold ${
            systemStatus ? "text-green-400" : "text-red-500"
          }`}
        >
          {`${systemStatus ? "ONLINE" : "OFFLINE"}`}
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
