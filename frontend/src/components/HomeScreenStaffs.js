/** @format */
import React from "react";
import { NavLink} from "react-router-dom";

function HomeScreenStaffs({ entrepreneurs, loading }) {
  return (
    <div className=" shadow rounded mr-4 mt-14 overflow-hidden">
      <h1 className="p-3 text-[16px] font-[400] text-gray-200 bg-[#182237] border-b-[1px] border-gray-200 pb-2 mb-4 ">
        Some of your Entrepreneurs
      </h1>
      <div className="grid grid-cols-6 gap-2 justify-between items-center mx-4 border-b-[1px] text-gray-200 border-gray-200 mb-4 pb-2">
        <h3 className="font-[400]">Name</h3>
        <h3 className="font-[400]">Email</h3>
        <h3 className="font-[400]">Phone</h3>
        <h3 className="font-[400]">Year</h3>
        <h3 className="font-[400]">Business</h3>
        <h3 className="font-[400]">Action</h3>
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
                  className="grid grid-cols-6 gap-2 py-[10px] my-[4px] border-b border-gray-300 text-gray-200"
                >
                  <h3 className="flex items-center">
                    <img
                      src={staff?.image}
                      alt={staff?.name}
                      className="w-[35px] h-[35px] object-contain ml-2 mr-2 rounded-full "
                    />
                    <p className="">{staff?.name}</p>
                  </h3>{" "}
                  <h3 className="">
                    <a
                      href={`mailto:${staff?.email}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-200"
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
                      to={`/Entrepreneurs/Profile/${staff?._id}`}
                      className="w-[80px] px-[18px] py-[4px] mx-4 bg-[#31d831] text-sm font-semibold rounded cursor-pointer text-center ml-[50px]"
                    >
                      <span className="text-[12px] font-[500] text-gray-200">
                        VIEW
                      </span>
                    </NavLink>
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col pb-[100px] mt-[100px] text-gray-200">
              <h3>You have no entrepreneurs yet</h3>
              <NavLink to="/New_Entrepreneur" className="text-[lime]">
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
