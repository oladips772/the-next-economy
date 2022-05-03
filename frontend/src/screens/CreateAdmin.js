/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { AdminCreate } from "../Redux/Actions/AdminAction";
import toast from "react-hot-toast";

function CreateAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const adminCreate = useSelector((state) => state.adminCreate);
  const { loading, error, success } = adminCreate;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AdminCreate(name, email, password));
      if (error) {
        toast.error(error);
      } else if (success) {
        toast.success("admin created succesfully");
        setName("");
        setEmail("");
        setPassword("");
        window.location.reload();
      }
  };


  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-full">
          <h1 className="text-3xl mb-6 ">New Admin</h1>
          <div className="">
            <form className="flex flex-col mx-4" onSubmit={handleSubmit}>
              <label className="-mb-4" htmlFor="name">
                Admin Name
              </label>
              <input
                disabled={loading}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="h-[35px] w-[350px] border border-black outline-none p-2 rounded my-4"
              />
              <label className="-mb-4">Admin Email</label>
              <input
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="h-[35px] w-[350px] border border-black outline-none p-2 rounded my-4"
              />
              <label className="-mb-4">Admin Password</label>
              <input
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="h-[35px] w-[350px] border border-black outline-none p-2 rounded my-4"
              />
              <button
                disabled={loading}
                className={`w-[350px] ${
                  loading ? "bg-green-800 animate-pulse" : "bg-green-600"
                } text-white h-[35px] rounded mt-4 font-semibold text-[13px]`}
              >
                {`${loading ? "Creating..." : "Create"}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;
