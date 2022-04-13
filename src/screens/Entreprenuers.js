/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Entreprenuers() {
  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-3xl mb-4 w-full">Entrepreneurs</h1>
          <div className="w-full flex items-center h-8 rounded-sm shadow">
            <input
              type="search"
              className=""
              placeholder="search by Name , Email ,Year ,Bussiness "
            />
            <SearchOutlinedIcon className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entreprenuers;
