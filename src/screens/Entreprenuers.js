/** @format */
import React from "react";
import Sidebar from "../components/Sidebar";
import { entrepreneurs } from "../data/entrepreneurs";

function Entreprenuers() {
  const [search, setSearch] = React.useState("");

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
              placeholder="Search by Name , Email ,Year ,Bussiness"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            {entrepreneurs
              .filter((user) => user.name.toLowerCase().includes(search))
              .map((person) => (
                <div
                  className="flex items-center justify-around mx-4 my-4 p-2"
                  key={person.id}
                >
                  <div className="flex items-center">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 object-contain mr-2 rounded-full "
                    />
                    <span>{person.name}</span>
                  </div>
                  <span className="text-[15px]">{person.email}</span>
                  <span className="text-[15px]">{person.phone}</span>
                  <span className="text-[15px]">{person.year}</span>
                  <span className="">{person.bussiness}</span>
                  <div>
                    <span className="p-1 mx-4 bg-green-700 text-white rounded cursor-pointer">
                      Edit
                    </span>
                    <span className="p-1 bg-red-700 text-white rounded cursor-pointer">
                      Delete
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entreprenuers;
