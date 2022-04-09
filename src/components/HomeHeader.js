/** @format */
import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";

function HomeHeader() {
  return (
    <div>
      <div className="grid grid-cols-2 mt-6">
        <div className="shadow-md h-[100px] w-60 rounded mx-8 relative border-l-2 border-green-400">
          <div className="absolute bg-green-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <PeopleAltOutlinedIcon className="dashboard_icon" />
          </div>
          <p className="text-lg absolute -bottom-1 pb-2 ml-2 text-gray-600 font-bold">
            Total Recruiters
          </p>
          <span className="absolute right-4 text-3xl font-bold text-gray-700">
            48
          </span>
        </div>
        {/*  */}
        <div className="shadow-md h-[100px] w-60 rounded mx-8 relative border-l-2 border-green-400">
          <div className="absolute bg-green-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <PersonPinOutlinedIcon className="dashboard_icon" />
          </div>
          <p className="text-lg absolute -bottom-1 pb-2 ml-2 text-gray-600 font-bold">
            Total Staffs
          </p>
          <span className="absolute right-4 text-3xl font-bold text-gray-700">
            18
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
