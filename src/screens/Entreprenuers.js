/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { staffs } from "../data/staffs";

function Entreprenuers() {
  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-3xl mb-4 w-full">Entrepreneurs</h1>
          <div className="search_container">
            <input
              type="search"
              className=""
              placeholder="search by Name , Email ,Year ,Bussiness "
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entreprenuers;
