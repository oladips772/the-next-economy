/** @format */
import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";

function EventsCard({ data }) {
  return (
    <div>
      <div className="rounded overflow-hidden">
        <div className="grid grid-cols-7 gap-2 bg-[#182237] pt-4 pb-4 pl-6 border-b border-slate-400">
          <h3 className="font-[400] text-gray-200 text-[15px]">Name</h3>
          <h3 className="font-[400] text-gray-200 text-[15px]">Description</h3>
          <h3 className="font-[400] text-gray-200 text-[15px]">No Attendees</h3>
          <h3 className="font-[400] text-gray-200 text-[15px]">Starting On</h3>
          <h3 className="font-[400] text-gray-200 text-[15px]">Ending On</h3>
          <h3 className="font-[400] text-gray-200 text-[15px]">Status</h3>
          <h3 className="font-[400] text-gray-200 text-[15px]">Action</h3>
        </div>
        {data.map((person) => (
          <div
            key={person?._id}
            className="grid grid-cols-7 gap-2 py-[10px] my-[4px] text-gray-200 border-b border-gray-500"
          >
            <h3 className="flex items-center ml-2">
              {person?.name?.slice(0, 10)}
              {person?.name?.length > 8 && ".."}
            </h3>{" "}
            <h3 className=" text-gray-200">
              {person?.description?.slice(0, 13)}
              {person?.description?.length > 13 && ".."}
            </h3>
            <h3 className="mx-4">{person?.numberOfAttendees}</h3>
            <h3 className="text-sm">{moment(person?.startDate).format("ll")}</h3>
            <h3 className="text-sm">{moment(person?.endDate).format("ll")}</h3>
            {person?.status === "Not Started" && (
              <h3 className="text-sm rounded bg-red-600 text-red-100 text-center px-[3px] pt-[1.5px] w-[90px]">
                {person?.status}
              </h3>
            )}
            {person?.status === "Ongoing" && (
              <h3 className="text-sm rounded bg-[brown] text-[white] text-center px-[3px] pt-[1.5px] w-[75px]">
                {person?.status}
              </h3>
            )}
            {person?.status === "Completed" && (
              <h3 className="text-sm rounded bg-green-500 text-green-100 text-center px-[3px] pt-[2px] w-[90px]">
                {person?.status}
              </h3>
            )}
            <h3>
              <NavLink
                to={`/Events/Profile/${person?._id}`}
                className="w-[80px] px-[12px] py-[4px] mx-4 bg-green-500 text-sm font-semibold rounded cursor-pointer text-center ml-[50px]"
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

export default EventsCard;
