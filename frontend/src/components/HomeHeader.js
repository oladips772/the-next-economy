/** @format */
import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AndroidIcon from "@mui/icons-material/Android";

function HomeHeader({ entrepreneurs, developers,loading,developerLoading }) {
  return (
    <div>
      <div className="grid grid-cols-5 mt-8 gap-[80px]">
        <div className="shadow-md h-[110px] w-[210px] rounded relative border-l-2 border-green-400">
          <div className="absolute bg-green-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <PeopleAltOutlinedIcon className="dashboard_icon" />
          </div>
          <p className="text-[16px] absolute bottom-1 pb-2 ml-2 font-[400]">
            Total Entrepreneurs
          </p>
          <span className="absolute right-4 text-3xl font-[600]">
            {entrepreneurs?.length}
          </span>
        </div>
        <div className="shadow-md h-[110px] w-[210px] rounded  relative border-l-2 border-green-400">
          <div className="absolute bg-green-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <AndroidIcon className="dashboard_icon" />
          </div>
          <p className="text-[16px] absolute bottom-1 pb-2 ml-2 font-[400]">
            Total Developers
          </p>
          <span className="absolute right-4 text-3xl font-[600]">
            {developers?.length}
          </span>
        </div>
        <div className="shadow-md h-[110px] w-[210px] rounded  relative border-l-2 border-green-400">
          <div className="absolute bg-green-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <AndroidIcon className="dashboard_icon" />
          </div>
          <p className="text-[16px] absolute bottom-1 pb-2 ml-2 font-[400]">
            Total Developers
          </p>
          <span className="absolute right-4 text-3xl font-[600]">
            {developers?.length}
          </span>
        </div>
        <div className="shadow-md h-[110px] w-[210px] rounded  relative border-l-2 border-green-400">
          <div className="absolute bg-green-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <AndroidIcon className="dashboard_icon" />
          </div>
          <p className="text-[16px] absolute bottom-1 pb-2 ml-2 font-[400]">
            Total Developers
          </p>
          <span className="absolute right-4 text-3xl font-[600]">
            {developers?.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
