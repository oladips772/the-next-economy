/** @format */
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AndroidIcon from "@mui/icons-material/Android";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../Redux/Actions/AdminAction";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";

function Sidebar() {
  const navigate = useNavigate();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const status = navigator.onLine;
  const [systemStatus, setSystemStatus] = useState(status);

  const getStatus = () => {
    if (navigator.onLine) {
      setSystemStatus(true);
    } else {
      if (!navigator.onLine) {
        setSystemStatus(false);
      }
    }
  };

  const dispatch = useDispatch();

  const LOGOUT = (e) => {
    e.preventDefault();
    dispatch(AdminLogout());
    navigate("/Login");
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     getStatus();
  //   }, [100]);
  // }, []);

  return (
    <div className="h-[100vh] bg-gray-800 w-[220px] fixed sidebar">
      <div className="mt-3 overflow-y-scroll h-[87%]">
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
            <GridViewOutlinedIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500]">DASHBOARD</p>
          </NavLink>
        </div>
        <p className="text-white ml-4 mr-[10px] text-[12px] -mb-[4px] mt-2">
          Entrepreneurs
        </p>
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
            <PersonAddAltOutlinedIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500]">ADD ENTREPRENEUR</p>
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
            <PeopleAltOutlinedIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500]">ENTREPRENEURS</p>
          </NavLink>
        </div>
        <p className="text-white ml-4 mr-[10px] text-[12px] -mb-[4px] mt-2">
          Developers
        </p>
        <div className="my-4">
          <NavLink
            to="/CreateDevelopers"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <AddCircleOutlineIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500]">CREATE DEVS</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/Developers"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <AndroidIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500]">FULLSTACK DEVS</p>
          </NavLink>
        </div>
        <p className="text-white ml-4 mr-[10px] text-[12px] -mb-[4px] mt-2">
          Communities
        </p>
        <div className="my-4">
          <NavLink
            to="/NewCommunity"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <AddCircleOutlineIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500] uppercase">new community</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/Communities"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <HiOutlineUserGroup className=" ml-4 mr-[10px]" size={23} />
            <p className="text-[12px] font-[500] uppercase">communities</p>
          </NavLink>
        </div>
        <p className="text-white ml-4 mr-[10px] text-[12px] -mb-[4px] mt-2">
          Programs
        </p>
        <div className="my-4">
          <NavLink
            to="/NewProgram"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <AddCircleOutlineIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500] uppercase">new program</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/Programs"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <IoCalendarNumberOutline className="ml-4 mr-[10px]" size={23} />
            <p className="text-[12px] font-[500] uppercase">programs</p>
          </NavLink>
        </div>
        <p className="text-white ml-4 mr-[10px] text-[12px] -mb-[4px] mt-2">
          Events
        </p>
        <div className="my-4">
          <NavLink
            to="/NewEvent"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <AddCircleOutlineIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500] uppercase">new event</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/Events"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <IoCalendarNumberOutline className="ml-4 mr-[10px]" size={23} />
            <p className="text-[12px] font-[500] uppercase">events</p>
          </NavLink>
        </div>
        <p className="text-white ml-4 mr-[10px] text-[12px] -mb-[4px] mt-2">
          Business
        </p>
        <div className="my-4">
          <NavLink
            to="/NewBusiness"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <AddCircleOutlineIcon className="ml-4 mr-[10px] text-[12px]" />
            <p className="text-[12px] font-[500] uppercase">new business</p>
          </NavLink>
        </div>
        <div className="my-4">
          <NavLink
            to="/Businesses"
            className="flex items-center"
            style={({ isActive }) => {
              return {
                color: isActive ? "rgb(40, 211, 40)" : "white",
                borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
              };
            }}
          >
            <HiOutlineUserGroup className=" ml-4 mr-[10px]" size={23} />
            <p className="text-[12px] font-[500] uppercase">businesses</p>
          </NavLink>
        </div>

        {adminInfo?.masterAdmin && (
          <div className="my-4">
            <p className="text-white ml-4 mr-[10px] text-[12px] mb-2">Admins</p>
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
              <AdminPanelSettingsIcon className="ml-4 mr-[10px] text-[12px]" />
              <p className="text-[12px] font-[500]">NEW ADMIN</p>
            </NavLink>
            <NavLink
              to="/CreateAdmin"
              className="flex items-center mt-3"
              style={({ isActive }) => {
                return {
                  color: isActive ? "rgb(40, 211, 40)" : "white",
                  borderLeft: isActive ? "solid 4px rgb(40, 211, 40)" : "",
                };
              }}
            >
              <AdminPanelSettingsIcon className="ml-4 mr-[10px] text-[12px]" />
              <p className="text-[12px] font-[500]">ADMINS</p>
            </NavLink>
          </div>
        )}
      </div>
      {/* logout and system status */}
      <div
        className="absolute bottom-[35px] flex items-center mx-2 cursor-pointer"
        onClick={LOGOUT}
      >
        <LogoutIcon className="rotate-180 text-white mr-2 text-[10px]" />
        <p className="text-white text-sm font-[500]">LOG OUT</p>
      </div>
      <div className="absolute bottom-2 flex items-center mx-2">
        <p className="text-white text-[10px] font-[600]">SYSTEM STATUS : </p>
        <span
          className={`h-2 w-2 rounded-full ml-4 -mt-[1px] ${
            systemStatus ? "bg-green-400" : "bg-red-600"
          }`}
        ></span>
        <span
          className={` ml-1 text-[10px] font-[600] ${
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
