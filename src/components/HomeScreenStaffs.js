/** @format */
import React from "react";
import staffs from "../data/staffs";

function HomeScreenStaffs() {
  return (
    <div className="-mt-[70px] shadow rounded mr-4 w-[600px]">
      <h1 className="p-2 text-lg font-bold border-b-[1px] border-gray-200 pb-2 mb-4">
        Some of your staffs
      </h1>
      <div className="flex justify-between items-center mx-4 border-b-[1px] border-gray-200 mb-4 pb-2">
        <h3 className="font-bold text-gray-800">Full Name</h3>
        <h3 className="font-bold text-gray-800">Phone</h3>
        <h3 className="font-bold text-gray-800">Email</h3>
      </div>
      <div className="">
        <div className="flex justify-between mx-4 items-center my-4">
          <div className="flex items-center">
            <img
              src="https://campusdata.uark.edu/resources/images/articles/2022-02-15_11-14-36-AMChulyndriaLayeDeansSpotlightheadshot.jpg?width=800&mode=max"
              alt=""
              className="h-8 w-8 object-contain rounded-full mr-2"
            />
            <p className="text-sm">Abubakar sanni</p>
          </div>
          <p className="text-sm">090 774 848 84</p>
          <p className="text-sm">oladips200@gmail.com</p>
        </div>
        <div className="flex justify-between mx-4 items-center my-4">
          <div className="flex items-center">
            <img
              src="https://campusdata.uark.edu/resources/images/articles/2022-02-15_11-14-36-AMChulyndriaLayeDeansSpotlightheadshot.jpg?width=800&mode=max"
              alt=""
              className="h-8 w-8 object-contain rounded-full mr-2"
            />
            <p className="text-sm">Abubakar sanni</p>
          </div>
          <p className="text-sm">090 774 848 84</p>
          <p className="text-sm">oladips200@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default HomeScreenStaffs;
