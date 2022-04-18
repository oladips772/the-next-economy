/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";

function CreateAdmin() {
  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-full">
          <h1 className="text-3xl mb-4 w-full">New Admin</h1>
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;
