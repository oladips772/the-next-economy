/** @format */
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
          <th>Action</th>
        </tr>
        {data.map((person) => (
          <>
            <tr key={person?._id}>
              <td>
                <img
                  src={person?.image}
                  alt={person?.name}
                  className="w-[35px] h-[35px] object-contain ml-2 mr-2 rounded-full "
                />
                {person?.name}
              </td>{" "}
              <td className="ml-8 mr-6 text-gray-800">
                <a href={`mailto:${person?.email}`} target="_blank">
                  {person?.email}
                </a>
              </td>
              <td>{person?.phone}</td>
              <td>{person?.year}</td>
              <td>{person?.bussiness}</td>
              <td>
                <NavLink
                  to={`/DevProfile/${person?._id}`}
                  className="w-[80px] p-[4px] mx-4 bg-green-700 text-sm font-semibold rounded cursor-pointer text-center ml-[50px]"
                >
                  <span className="text-[12px] font-semibold text-white">
                    VIEW
                  </span>
                </NavLink>
              </td>
            </tr>
          </>
        ))}
      </table>
    </>
  );
}

export default User;
