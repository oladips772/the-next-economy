/** @format */
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { NavLink, Link } from "react-router-dom";

function HomeScreenStaffs({ entrepreneurs, loading }) {
  return (
    <div className=" shadow rounded mr-4 mt-14 overflow-hidden">
      <h1 className="p-2 text-lg font-[400] text-white bg-green-600 border-b-[1px] border-gray-200 pb-2 mb-4 ">
        Some of your Entrepreneurs
      </h1>
      <div className="grid grid-cols-6 gap-2 justify-between items-center mx-4 border-b-[1px] border-gray-200 mb-4 pb-2">
        <h3 className="font-[500]">Name</h3>
        <h3 className="font-[500]">Email</h3>
        <h3 className="font-[500]">Phone</h3>
        <h3 className="font-[500]">Year</h3>
        <h3 className="font-[500]">Business</h3>
        <h3 className="font-[500]">Action</h3>
      </div>
      {loading ? (
        <img src="/images/loader2.png" alt="" className="ml-[250px]" />
      ) : (
        <>
          {entrepreneurs?.length >= 1 ? (
            <div className="">
              {entrepreneurs?.slice(0, 6).map((staff) => (
                <div
                  key={staff?._id}
                  className="grid grid-cols-6 gap-2 py-[10px] my-[4px] border-b border-gray-300"
                >
                  <h3 className="flex items-center">
                    <img
                      src={staff?.image}
                      alt={staff?.name}
                      className="w-[35px] h-[35px] object-contain ml-2 mr-2 rounded-full "
                    />
                    <p className="">{staff?.name}</p>
                  </h3>{" "}
                  <h3 className=" text-gray-800">
                    <a
                      href={`mailto:${staff?.email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {staff?.email?.slice(0, 10)}
                      {staff?.email?.length > 10 && ".."}
                    </a>
                  </h3>
                  <td>{staff?.phone}</td>
                  <h3 className="mx-4">
                    {" "}
                    <p className="">{staff?.year}</p>
                  </h3>
                  <h3 className="">{staff?.bussiness}</h3>
                  <h3>
                    <NavLink
                      to={`/Profile/${staff?._id}`}
                      className="w-[80px] px-[18px] py-[4px] mx-4 bg-green-600 text-sm font-semibold rounded cursor-pointer text-center ml-[50px]"
                    >
                      <span className="text-[12px] font-[500] text-white">
                        VIEW
                      </span>
                    </NavLink>
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col pb-[100px] mt-[100px]">
              <h3>You have no entrepreneurs yet</h3>
              <NavLink to="/New_Entrepreneur" className="text-green-600">
                click here to create entrepreneurs
              </NavLink>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomeScreenStaffs;
