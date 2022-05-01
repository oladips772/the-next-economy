/** @format */
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../Redux/Actions/AdminAction";

function Sidebar() {
  const navigate = useNavigate();

  const status = navigator.onLine;
  const [systemStatus, setSystemStatus] = useState(status);
  const dispatch = useDispatch();

  const LOGOUT = (e) => {
    e.preventDefault();
    dispatch(AdminLogout());
    navigate("/Login");
  };

  useEffect(() => {
    setSystemStatus(status);
  }, [status]);

  return (
    <div className="h-[100vh] bg-black w-[220px] fixed ">
      <div className="text-center justify-center">
        <img
          src="http://blackinnovationsafrica.com/wp-content/uploads/2020/02/logo.png"
          className="object-contain ml-6 mt-4"
          alt=""
        />
      </div>
      <div className="mt-6">
        <div className="my-4 hover:text-green-500">
          <NavLink
            to="/"
            className="flex items-center hover:text-green-500"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <GridViewOutlinedIcon className="mx-4 text-lg" />
            <p className="text-[13px] font-semibold">DASHBOARD</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/New_Entrepreneur"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <PersonAddAltOutlinedIcon className="mx-4 text-lg" />
            <p className="text-[13px] font-semibold">ADD ENTREPRENEUR</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/Entrepreneurs"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <PeopleAltOutlinedIcon className="mx-4 text-lg" />
            <p className="text-[13px] font-semibold">ENTREPRENEURS</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/CreateAdmin"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <AdminPanelSettingsIcon className="mx-4 text-lg" />
            <p className="text-[13px] font-semibold">NEW ADMIN</p>
          </NavLink>
        </div>
      </div>
      {/*  */}
      <div
        className="absolute bottom-10 flex items-center mx-2 cursor-pointer"
        onClick={LOGOUT}
      >
        <LogoutIcon className="rotate-180 text-white mr-2 text-sm" />
        <p className="text-white text-sm font-semibold">LOG OUT</p>
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
