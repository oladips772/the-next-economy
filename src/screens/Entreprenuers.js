/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { entrepreneurs } from "../data/entrepreneurs";

function Entreprenuers() {
  const [query, setQuery] = React.useState("");

  const search = (data) => {
    return data.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.email.toLowerCase().includes(query) ||
        person.bussiness.toLowerCase().includes(query) ||
            person.phone.includes(query) ||
        person.year.includes(query)
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-3xl mb-4 w-full">Entrepreneurs</h1>
          <div className="search_container">
            <input
              type="search"
              className=""
              placeholder="Search by Name , Email ,Bussiness , Year"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {/*  */}
          <div className="mt-8 w-[1100px] bg-white shadow rounded">
            <div className="flex w-full items-center justify-around p-2">
              <p className="font-semibold text-gray-800">Name</p>
              <p className="font-semibold text-gray-800">Email</p>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="font-semibold text-gray-800">Year</p>
              <p className="font-semibold text-gray-800">Bussiness</p>
              <p className="font-semibold text-gray-800">Actions</p>
            </div>
            {/*  */}
            <User data={search(entrepreneurs)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entreprenuers;
