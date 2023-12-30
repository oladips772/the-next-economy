/** @format */
import { NavLink } from "react-router-dom";

function User({ data }) {
  return (
    <div>
      <div className="rounded overflow-hidden">
        <div className="grid grid-cols-6 gap-2 bg-[#182237] pt-4 pb-4 pl-6 border-b border-slate-400">
          <h3 className="font-[400] text-gray-200 ">Name</h3>
          <h3 className="font-[400] text-gray-200 ">Email</h3>
          <h3 className="font-[400] text-gray-200 ">Phone</h3>
          <h3 className="font-[400] text-gray-200 ">Year</h3>
          <h3 className="font-[400] text-gray-200 ">Business</h3>
          <h3 className="font-[400] text-gray-200 ">Action</h3>
        </div>
        {data.map((person) => (
          <div
            key={person?._id}
            className="grid grid-cols-6 gap-2 py-[10px] my-[4px] border-b border-gray-400 text-gray-200"
          >
            <h3 className="flex items-center">
              <img
                src={person?.image}
                alt={person?.name}
                className="w-[35px] h-[35px] object-contain ml-2 mr-2 rounded-full "
              />
              <p className="">{person?.name}</p>
            </h3>{" "}
            <h3 className="">
              <a
                href={`mailto:${person?.email}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-200"
              >
                {person?.email?.slice(0, 10)}
                {person?.email?.length > 10 && ".."}
              </a>
            </h3>
            <td>{person?.phone}</td>
            <h3 className="mx-4">
              {" "}
              <p className="">{person?.year}</p>
            </h3>
            <h3 className="">{person?.bussiness}</h3>
            <h3>
              <NavLink
                to={`/Entrepreneurs/Profile/${person?._id}`}
                className="w-[80px] px-[12px] py-[4px] mx-4 bg-[#31d831] text-sm font-semibold rounded cursor-pointer text-center ml-[50px]"
              >
                <span className="text-[12px] font-semibold text-gray-200 ">
                  VIEW
                </span>
              </NavLink>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
