/** @format */
import React from "react";
import { NavLink } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";

function Sidebar() {
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
          <NavLink to="/" className="flex items-center">
            <PeopleAltOutlinedIcon className="mx-4 text-white text-lg" />
            <p className="text-white text-lg">Recruitment</p>
          </NavLink>
        </div>
        <div className="mx-y">
          <NavLink to="/" className="flex items-center">
            <PersonPinOutlinedIcon className="mx-4 text-white text-lg" />
            <p className="text-white text-lg">Staffs</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
