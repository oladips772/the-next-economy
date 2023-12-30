/** @format */
import React from "react";
import { NavLink } from "react-router-dom";

function BusinessCard({ data }) {
  return (
    <div>
      <div className="rounded overflow-hidden">
        <div className="grid grid-cols-7 gap-2 bg-[#182237] pt-4 pb-4 pl-6 border-b border-slate-300">
          <h3 className="font-[400] text-gray-200">Name</h3>
          <h3 className="font-[400] text-gray-200">Description</h3>
          <h3 className="font-[400] text-gray-200">Owners Name</h3>
          <h3 className="font-[400] text-gray-200">Owners Email</h3>
          <h3 className="font-[400] text-gray-200">Owners No</h3>
          <h3 className="font-[400] text-gray-200">Location</h3>
          <h3 className="font-[400] text-gray-200">Action</h3>
        </div>
        {data.map((person) => (
          <div
            key={person?._id}
            className="grid grid-cols-7 gap-2 py-[14px] my-[4px] border-b border-gray-300 text-gray-200"
          >
            <h3 className="flex items-center ml-2">
              {person?.name?.slice(0, 14)}
              {person?.name?.length > 14 && ".."}
            </h3>{" "}
            <h3 className="">
              {person?.description?.slice(0, 13)}
              {person?.description?.length > 13 && ".."}
            </h3>
            <h3 className="mx-4">
              {person?.ownersName?.slice(0, 9)}
              {person?.ownersName?.length > 9 && ".."}
            </h3>
            <h3 className="">
              {person?.ownersEmail?.slice(0, 13)}
              {person?.ownersEmail?.length > 13 && ".."}
            </h3>
            <h3 className="">{person?.ownersNumber}</h3>
            <h3 className="">
              {person?.location?.slice(0, 13)}
              {person?.location?.length > 13 && ".."}
            </h3>
            <h3>
              <NavLink
                to={`/Businesses/Profile/${person?._id}`}
                className="w-[80px] px-[12px] py-[4px] mx-4 bg-[#31d831] text-sm font-semibold rounded cursor-pointer text-center ml-[50px]"
              >
                <span className="text-[12px] font-semibold text-gray-200">
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

export default BusinessCard;
