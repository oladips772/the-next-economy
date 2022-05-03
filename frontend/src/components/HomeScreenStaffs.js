/** @format */
import React from "react";
import { staffs } from "../data/staffs";
import { Link } from "react-router-dom";

function HomeScreenStaffs({ entrepreneurs, loading }) {
  return (
    <div className=" shadow rounded mr-4 w-[600px] mt-14">
      <h1 className="p-2 text-lg font-bold border-b-[1px] border-gray-200 pb-2 mb-4 text-gray-900">
        Some of your Entrepreneurs
      </h1>
      <div className="flex justify-between items-center mx-4 border-b-[1px] border-gray-200 mb-4 pb-2">
        <h3 className="font-bold text-gray-800 text-sm">Full Name</h3>
        <h3 className="font-bold text-gray-800 text-sm">Phone</h3>
        <h3 className="font-bold text-gray-800 text-sm">Email</h3>
      </div>
      {loading ? (
        <img src="/images/loader2.png" alt="" className="ml-[250px]" />
      ) : (
        <div className="">
          {entrepreneurs?.slice(0, 6).map((staff) => (
            <div className="" key={staff?._id}>
              <Link
                to={`Profile/${staff._id}`}
                className="flex justify-between mx-4 items-center my-2 py-2"
              >
                <div className="flex items-center">
                  <img
                    src={staff?.image}
                    alt=""
                    className="h-10 w-10 object-contain rounded-full mr-2"
                  />
                  <p className="text-sm font-semibold">{staff?.name}</p>
                </div>
                <p className="text-sm font-semibold">{staff?.phone}</p>
                <p className="text-sm font-semibold">{staff?.email}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreenStaffs;
