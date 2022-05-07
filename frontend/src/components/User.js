/** @format */
import { useState ,useRef} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEntrepreneur } from "../Redux/Actions/EntrepreneurAction";
import toast from "react-hot-toast";


function User({ data }) {
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const userRef = useRef(null)

  function DELETE(id) {
    dispatch(deleteEntrepreneur(id));
    toast.success("Entrepreneur Deleted");
    window.location.reload();
  }

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
              </td>
              <td>{person?.email}</td>
              <td>{person?.phone}</td>
              <td>{person?.year}</td>
              <td>{person?.bussiness}</td>
              <td>
                <NavLink
                  to={`/Profile/${person?._id}`}
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
