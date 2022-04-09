/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";
import HomeHeader from "../components/HomeHeader";

function HomeScreen() {
  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-3xl mb-4 w-full">Dashboard</h1>
          <HomeHeader />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
