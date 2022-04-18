/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";

function CreateAdmin() {
  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-full">
          <h1 className="text-3xl mb-6 ">New Admin</h1>
          <div className="">
            <form className="flex flex-col mx-4">
              <label className="">Admin Name</label>
              <input
                type="text"
                placeholder="Admin Name"
                className="h-[35px] w-[350px] border border-black outline-none p-4 rounded my-2"
              />
              <label className="">Admin Email</label>
              <input
                type="email"
                placeholder="Admin Email"
                className="h-[35px] w-[350px] border border-black outline-none p-4 rounded my-2"
              />
              <label className="">Admin Password</label>
              <input
                type="password"
                placeholder="Admin Password"
                className="h-[35px] w-[350px] border border-black outline-none p-2 rounded my-2"
              />
              <button className="w-[350px] bg-green-600 text-white h-[35px] rounded mt-4 font-semibold text-[13px]">
                CREATE ADMIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;
