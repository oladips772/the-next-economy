/** @format */
import React from "react";
import { NavLink } from "react-router-dom";

function User({ data }) {
  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Year</th>
          <th>Bussiness</th>
          <th>Actions</th>
        </tr>
        {data?.map((person) => (
          <>
            <tr>
              <td>
                <img
                  src={person?.image}
                  alt={person?.name}
                  className="w-[35px] h-[35px] object-contain ml-2 mr-2 rounded-full "
                />
                {person?.name}
              </td>
              <td>{person?.email}</td>
              <td>{person?.phone}</td>
              <td>{person?.year}</td>
              <td>{person?.bussiness}</td>
              <td>
                <NavLink to={`/Edit/${person?.id}`}>
                  <span className="p-1 mx-4 bg-green-700 text-white rounded cursor-pointer">
                    Edit
                  </span>
                </NavLink>
                <span className="p-1 bg-red-700 text-white rounded cursor-pointer">
                  Delete
                </span>
              </td>
            </tr>
          </>
        ))}
      </table>
    </>
  );
}

export default User;
