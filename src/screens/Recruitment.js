/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";

function HomeScreen() {
  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-full">
          <h1 className="text-3xl mb-4 w-full">Recruitment</h1>
          <div>
            <h2>Add new recruiter</h2>
          </div>
          <div className="flex justify-between shadow ml-20 w-[900px] mt-6">
            <img src="" alt="" className="" />
            <div className="flex flex-col items-center -ml-14">
              <input
                type="text"
                placeholder="Full Name"
                className="outline-none h-10 my-4 border-[1px] border-black rounded-sm mx-2 p-2 w-[350px]"
              />
              <input
                type="text"
                placeholder="Email"
                className="outline-none h-10 my-4 border-[1px] border-black rounded-sm p-2 w-[350px]"
              />
              <select className="w-full shadow outline-none border-none h-10 cursor-pointer bg-white mt-4">
                <option value="Employment">Employment</option>
                <option value="Entrepreneur">Entrepreneur</option>
              </select>
            </div>
            <div className="flex flex-col items-centerspace-x-4">
              <input
                type="text"
                placeholder="Phone"
                className="outline-none h-10 my-4 border-[1px] border-black rounded-sm mx-2 p-2 w-[350px]"
              />
              <select className="w-full shadow outline-none border-none h-10 cursor-pointer bg-white">
                <option
                  value="Registered"
                  className="border-none h-10 cursor-pointer"
                >
                  Registered
                </option>
                <option
                  value="Not Registered"
                  className="border-none h-10 cursor-pointer"
                >
                  Not Registered
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
