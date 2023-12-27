/** @format */
import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";

function ProgramsData({ data }) {
  return (
    <div>
      <div className="rounded overflow-hidden">
        <div className="grid grid-cols-7 gap-2 bg-green-600 pt-4 pb-4 pl-6 border-b border-slate-300">
          <h3 className="font-[400] text-white">Name</h3>
          <h3 className="font-[400] text-white">Description</h3>
          <h3 className="font-[400] text-white">Beneficiaries</h3>
          <h3 className="font-[400] text-white">Starting On</h3>
          <h3 className="font-[400] text-white">Ending On</h3>
          <h3 className="font-[400] text-white">Status</h3>
          <h3 className="font-[400] text-white">Action</h3>
        </div>
        {data.map((person) => (
          <div
            key={person?._id}
            className="grid grid-cols-7 gap-2 py-[10px] my-[4px] border-b border-gray-300"
          >
            <h3 className="flex items-center ml-2">
              {person?.name?.slice(0, 10)}
              {person?.name?.length > 8 && ".."}
            </h3>{" "}
            <h3 className=" text-gray-800">
              {person?.description?.slice(0, 13)}
              {person?.description?.length > 13 && ".."}
            </h3>
            <h3 className="mx-4">{person?.numberOfIntakes}</h3>
            <h3 className="">{moment(person?.startDate).format("L")}</h3>
            <h3 className="">{moment(person?.endDate).format("L")}</h3>
            <h3 className="">{person?.status}</h3>
            <h3>
              <NavLink
                to={`/Programs/Profile/${person?._id}`}
                className="w-[80px] px-[12px] py-[4px] mx-4 bg-green-600 text-sm font-semibold rounded cursor-pointer text-center ml-[50px]"
              >
                <span className="text-[12px] font-semibold text-white">
                  VIEW
                </span>
              </NavLink>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgramsData;
