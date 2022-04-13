/** @format */
import React from "react";

function User({data}) {
  return (
    <>
      {data.map((person) => (
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
    </>
  );
}

export default User;
