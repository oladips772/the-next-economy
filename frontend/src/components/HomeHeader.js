/** @format */
import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AndroidIcon from "@mui/icons-material/Android";
import { Oval } from "react-loader-spinner";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";

function HomeHeader({
  entrepreneurs,
  developers,
  loading,
  developerLoading,
  communities,
  communityLoading,
  programsLoading,
  programs,
}) {
  return (
    <div>
      <div className="grid grid-cols-5 mt-8 gap-[80px]">
        {/* entrepreneurs */}
        <div className="shadow-md h-[110px] w-[210px] rounded relative bg-[#182237] border-t-2 border-l-2 border-green-400">
          <div className="absolute bg-green-600  rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <PeopleAltOutlinedIcon className="dashboard_icon" />
          </div>
          <p className="text-[14.5px] absolute bottom-[1px] pb-2 ml-2 font-[400] text-gray-200">
            Total Entrepreneurs
          </p>
          {loading ? (
            <div className="absolute right-2 top-2">
              <Oval
                color="green"
                visible={true}
                height="30"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
              />
            </div>
          ) : (
            <span className="absolute right-4 top-1 text-[28px] font-[500] text-gray-200">
              {entrepreneurs?.length}
            </span>
          )}
        </div>
        {/* developers */}
        <div className="shadow-md h-[110px] w-[210px] rounded bg-[#182237] relative border-t-2 border-l-2 border-orange-400">
          <div className="absolute bg-orange-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <AndroidIcon className="dashboard_icon" />
          </div>
          <p className="text-[14.5px] absolute bottom-[1px] pb-2 ml-2 font-[400] text-gray-200">
            Total Developers
          </p>
          {developerLoading ? (
            <div className="absolute right-2 top-2">
              <Oval
                color="orange"
                visible={true}
                height="30"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
              />
            </div>
          ) : (
            <span className="absolute right-4 top-1 text-[28px] font-[500] text-gray-200">
              {developers?.length}
            </span>
          )}
        </div>
        {/* communities */}
        <div className="shadow-md h-[110px] w-[210px] rounded bg-[#182237] text-gray-200 relative border-t-2 border-l-2 border-purple-400">
          <div className="absolute flex items-center justify-center bg-purple-600 rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <HiOutlineUserGroup className="text-gray-200" size={23} />
          </div>
          <p className="text-[14.5px] absolute bottom-[1px] pb-2 ml-2 font-[400]">
            Total Communities
          </p>
          {communityLoading ? (
            <div className="absolute right-2 top-2">
              <Oval
                color="orange"
                visible={true}
                height="30"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
              />
            </div>
          ) : (
            <span className="absolute right-4 top-1 text-[28px] font-[500]">
              {communities?.length}
            </span>
          )}
        </div>
        {/* programs */}
        <div className="shadow-md h-[110px] w-[210px] rounded bg-[#182237] text-gray-200 border-t-2 relative border-l-2 border-[crimson]">
          <div className="absolute flex items-center justify-center bg-[crimson] rounded h-10 w-10 text-center align-center -top-4 left-4 shadow">
            <IoCalendarNumberOutline className="text-gray-200" size={23} />
          </div>
          <p className="text-[14.5px] absolute bottom-[1px] pb-2 ml-2 font-[400]">
            Total Programs
          </p>
          {programsLoading ? (
            <div className="absolute right-2 top-2">
              <Oval
                color="orange"
                visible={true}
                height="30"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
              />
            </div>
          ) : (
            <span className="absolute right-4 top-1 text-[28px] font-[500]">
              {programs?.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
