/** @format */

import React from "react";
import { NavLink, Link } from "react-router-dom";

function CommunitiesCard({ data }) {
  return (
    <div>
      <div className="rounded overflow-hidden">
        <div className="grid grid-cols-5 gap-2 bg-green-600 pt-4 pb-4 pl-6 border-b border-slate-300">
          <h3 className="font-[400] text-white">Name</h3>
          <h3 className="font-[400] text-white">Description</h3>
          <h3 className="font-[400] text-white">Whatsapp chanel</h3>
          <h3 className="font-[400] text-white">Number of members</h3>
          <h3 className="font-[400] text-white">Action</h3>
        </div>
        {data.map((person) => (
          <div
            key={person?._id}
            className="grid grid-cols-5 gap-2 py-[10px] my-[4px] border-b border-gray-300"
          >
            <h3 className="flex items-center ml-2">{person?.name}</h3>{" "}
            <h3 className=" text-gray-800">
              {person?.description?.slice(0, 120)}
              {person?.description?.length > 120 && ".."}
            </h3>
            <h3 className="mx-4">
              <Link to={person?.whatsappChannel}>
                <p className="">{person?.whatsappChannel}</p>
              </Link>
            </h3>
            <h3 className="">{person?.numberOfMembers}</h3>
            <h3>
              <NavLink
                to={`/Communities/Profile/${person?._id}`}
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

export default CommunitiesCard;
